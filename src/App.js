import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoList from './components/cryptoList';
import CryptoDetail from './components/cryptoDetail';


function App() {
  return (
    <div className="App">
      <CryptoList />
    </div>

  );
}

export default App;
