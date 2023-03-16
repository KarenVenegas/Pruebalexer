import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function CryptoList() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    axios.get('https://api.coinlore.com/api/tickers/?start=0&limit=100')
      .then(res => {
        const cryptosData = res.data.data.map(crypto => ({
          name: crypto.name,
          symbol: crypto.symbol,
          price_usd: parseFloat(crypto.price_usd),
        }));
        setCryptos(cryptosData);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Top 100 Cryptocurrencies in USD</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map(crypto => (
            <tr key={crypto.symbol}>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
              <td>{crypto.price_usd.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CryptoList;
