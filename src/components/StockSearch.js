import React, { useContext } from 'react';
import { StockDataContext } from '../context/StockDataContext';

const StockSearch = () => {
  const { symbol, setSymbol, data, searchStock, error, removeStock } = useContext(StockDataContext);

  const handleSearch = () => {
    searchStock(symbol);
  };

  const handleRemove = () => {
    removeStock();
  };

  return (
    <div>
      <h3>Stock Information</h3>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div>
          <p>Symbol: {data.symbol}</p>
          <p>Name: {data.name}</p>
          <p>Price: ${data.stockData[0]?.price}</p>
          <button onClick={handleRemove}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
