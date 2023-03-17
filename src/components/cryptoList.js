import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, Pagination, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CryptoList() {
  const [cryptos, setCryptos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  const totalPages = Math.ceil(5000 / 100); // 5000 is the total number of cryptocurrencies available in the API

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleCryptoClick = (crypto) => {
    setSelectedCrypto(crypto);
  };

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const res = await axios.get(`https://api.coinlore.com/api/tickers/?start=${(currentPage - 1) * 100}&limit=100`);
        const cryptosData = res.data.data.map(crypto => ({
          name: crypto.name,
          symbol: crypto.symbol,
          price_usd: parseFloat(crypto.price_usd),
          id: crypto.id,
          precio_btc: crypto.precio_btc,
          percent_change_1h: crypto.percent_change_1h,
          percent_change_24h: crypto.percent_change_24h,
          percent_change_7d: crypto.percent_change_7d,
        }));
        setCryptos(cryptosData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCryptos();
  }, [currentPage]);

  return (
    <div className="container mt-4">
      <h1>Top 100 Cryptocurrencies in USD</h1>
      <Table striped bordered hover className="table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>id</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map(crypto => (
            <tr key={crypto.id}>
              <td>
                <Button variant="link" onClick={() => handleCryptoClick(crypto)}>
                  {crypto.name}
                </Button>
              </td>
              <td>{crypto.symbol}</td>
              <td>{crypto.price_usd.toFixed(2)}</td>
              <td>{crypto.id}</td>
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
      {selectedCrypto && (
        <Modal show={selectedCrypto != null} onHide={() => setSelectedCrypto(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Name: {selectedCrypto.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Symbol: {selectedCrypto.symbol}</p>
            <p>Price (USD): {selectedCrypto.price_usd.toFixed(2)}</p>
            <p>Id: {selectedCrypto.id}</p>
            <p>BTC price: {selectedCrypto.precio_btc}</p>
            <p>1 hour % change: {selectedCrypto.percent_change_1h}</p>
            <p>24 hours % change: {selectedCrypto.percent_change_24h}</p>
            <p>7 days % change: {selectedCrypto.percent_change_7d}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedCrypto(null)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default CryptoList;
