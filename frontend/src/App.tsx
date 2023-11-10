import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DatePicker from './DatePicker';
import CurrencyInfo from './CurrencyInfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 98vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  color: #333;
`;

const Button = styled.button<{ disabled: boolean }>`
  padding: 10px;
  margin-top: 10px;
  background-color: ${props => (props.disabled ? '#ccc' : '#4caf50')};
  color: white;
  border: none;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-left: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currencyInfo, setCurrencyInfo] = useState<{ buyValue: number; sellValue: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (selectedDate) {
      setLoading(true);
      setCurrencyInfo(null);

      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear().toString();
      
      const apiDateFormat = `${day}-${month}-${year}`;
      const apiEndpoint = `http://localhost:8000/cotation/${apiDateFormat}`;

      try {
        const response = await axios.get(apiEndpoint);
        if (response.status === 204) {
          toast.info("There's no data for this specific date.")
          return
        }
        setCurrencyInfo(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching data:', error);
          const errorText = error.response?.data?.detail || 'An error occurred';
          toast.error(errorText);
        } else {
          toast.error("Something went wrong. Please, try again later.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <ToastContainer autoClose={3000} />
      <Title>Currency App</Title>
      <DatePicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <CurrencyInfo currencyInfo={currencyInfo} />
      <Button disabled={!selectedDate || loading} onClick={fetchData}>
        {loading ? 'Loading...' : 'Fetch Data'}
        {loading && <LoadingSpinner />}
      </Button>
    </Container>
  );
};

export default App;
