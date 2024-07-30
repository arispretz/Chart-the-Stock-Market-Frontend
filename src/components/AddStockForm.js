import React, { useState, useContext } from 'react';
import { StockDataContext } from '../context/StockDataContext';

const AddStockForm = () => {
  const { symbol, setSymbol, searchStock } = useContext(StockDataContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!symbol.match(/^[A-Z]{1,5}$/)) {
      setErrorMessage('Please enter a valid stock symbol (e.g., AAPL, GOOG)');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await searchStock(symbol);
    } catch (error) {
      console.error('Error adding stock:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Stock'}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default AddStockForm;
