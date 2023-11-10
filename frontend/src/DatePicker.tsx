// src/DatePicker.tsx
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';
import styled from 'styled-components';

registerLocale('pt-BR', ptBR);

interface DatePickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
}

const StyledDatePicker = styled(DatePicker)`
  margin: 10px;
`;

const CustomDatePicker: React.FC<DatePickerProps> = ({ selectedDate, onSelectDate }) => {
  const today = new Date();

  return (
    <StyledDatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => onSelectDate(date)}
      dateFormat="dd/MM/yyyy"
      locale="pt-BR"
      maxDate={today} // Configura a data máxima como o dia de hoje
    />
  );
};

export default CustomDatePicker;
