import React, { createContext, useState } from 'react';
import axios from 'axios';

export const StockDataContext = createContext();

export const StockDataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState('');

  const searchStock = async (symbol) => {
    setError('');
    try {
      const response = await axios.get(`/api/stock?symbol=${symbol}`);
      if (response.data) {
        setData(response.data);
      } else {
        setError('No data found');
      }
    } catch (error) {
      console.error('Error searching for stock:', error);
      setError('An error occurred while searching for the stock. Please try again.');
    }
  };

  const removeStock = () => {
    setData(null);
    setSymbol('');
  };

  return (
    <StockDataContext.Provider value={{ data, setData, symbol, setSymbol, error, searchStock, removeStock }}>
      {children}
    </StockDataContext.Provider>
  );
};
