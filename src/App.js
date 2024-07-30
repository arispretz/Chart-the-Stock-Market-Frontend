import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StockDataProvider } from './context/StockDataContext';
import StockSearch from './components/StockSearch';
import StockChart from './components/StockChart';
import AddStockForm from './components/AddStockForm';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <StockDataProvider>
        <div>
          <h1>Stock Tracker</h1>
          <StockSearch />
          <StockChart />
          <AddStockForm />
          <Footer />
        </div>
      </StockDataProvider>
    </Router>
  );
};

export default App;
