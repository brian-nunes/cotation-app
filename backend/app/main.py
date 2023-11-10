from fastapi import FastAPI, HTTPException, Depends, Response
from pydantic import BaseModel
from app.utils import convert_date_format
from app.models import get_db, Cotation
from sqlalchemy.orm import Session
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET"],
)

class CotationResponse(BaseModel):
    buyValue: float
    sellValue: float

@app.get("/cotation/{date}", status_code=200, summary="Get currency cotations for a specific date", response_model=CotationResponse, responses={204: {"description": "No cotation for the day. Check for weekends or holidays, and also for dates in the future."}})
async def get_cotation(date: str  = Depends(convert_date_format), db: Session = Depends(get_db)):
    """
    Get currency cotations for a specific date.

    Parameters:
    - date (str): The date in the format 'dd-mm-yyyy'.

    Returns:
    - dict: Currency cotations for the specified date.
    """
    db_cotation = db.query(Cotation).filter(Cotation.date == date).first()

    if db_cotation:
        return CotationResponse(buyValue=db_cotation.buyValue, sellValue=db_cotation.sellValue)
    else:
        try:
            DOLAR_API_URL = f"https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='{date}'&$format=json"
            response = requests.get(DOLAR_API_URL)
            response.raise_for_status()
            
            api_cotations = response.json().get('value', [])

            if not isinstance(api_cotations, list):
                raise HTTPException(status_code=500, detail="Unexpected response format from external API")

            if not api_cotations:
                response = Response(status_code=204)
                return response

            db_cotation = Cotation(date=date, buyValue=api_cotations[0]['cotacaoCompra'], sellValue=api_cotations[0]['cotacaoVenda'])
            db.add(db_cotation)
            db.commit()
            db.refresh(db_cotation)

            return CotationResponse(buyValue=db_cotation.buyValue, sellValue=db_cotation.sellValue)
        except requests.RequestException as req_error:
            raise HTTPException(status_code=500, detail=f"Request to external API failed: {str(req_error)}")
        except HTTPException as http_error:
            raise http_error  # Rethrow the HTTPException
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")
