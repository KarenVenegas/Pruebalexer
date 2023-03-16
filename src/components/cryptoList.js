import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';

function CryptoList() {
    const [cryptos, setCryptos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
  
    const fetchCryptos = async () => {
      try {
        const res = await axios.get(`https://api.coinlore.com/api/tickers/?start=${(currentPage - 1) * 100}&limit=100`);
        const cryptosData = res.data.data.map(crypto => ({
          name: crypto.name,
          symbol: crypto.symbol,
          price_usd: parseFloat(crypto.price_usd),
        }));
        setCryptos(cryptosData);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchCryptos();
    }, [currentPage]);
  
    const totalPages = Math.ceil(5000 / 100); // 5000 is the total number of cryptocurrencies available in the API
  
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    };
  
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
        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <div className="d-flex align-items-center ml-3">
            Page {currentPage} of {totalPages}
          </div>
        </Pagination>
      </div>
    );
  }
  
  export default CryptoList;
  