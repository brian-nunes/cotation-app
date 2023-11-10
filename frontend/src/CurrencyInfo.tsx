// src/CurrencyInfo.tsx
import React from 'react';
import styled from 'styled-components';

interface CurrencyInfoProps {
  currencyInfo: { buyValue: number; sellValue: number } | null;
}

const InfoContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Price = styled.h2`
  color: #333;
`;

const CurrencyInfo: React.FC<CurrencyInfoProps> = ({ currencyInfo }) => {
  return (
    <InfoContainer>
      {currencyInfo && (
        <div>
          <Price>Buy Price: {currencyInfo.buyValue}</Price>
          <Price>Sell Price: {currencyInfo.sellValue}</Price>
        </div>
      )}
    </InfoContainer>
  );
};

export default CurrencyInfo;
