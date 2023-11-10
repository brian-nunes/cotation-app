from fastapi import Path, HTTPException
from datetime import datetime


def convert_date_format(date: str = Path(..., title="The date in the format 'dd-mm-yyyy'")):
    try:
        data_datetime = datetime.strptime(date, "%d-%m-%Y")
        return data_datetime.strftime("%m-%d-%Y")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use 'dd-mm-yyyy'")
