import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CryptoDetail() {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://api.coinlore.com/api/ticker/?id=${id}`);
      setCrypto(response.data[0]);
    };

    fetchData();
  }, [id]);

  if (!crypto) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{crypto.name} ({crypto.symbol})</h1>
      <p>Price: {crypto.price_usd}</p>
      <p>Market Cap: {crypto.market_cap_usd}</p>
      <p>Volume 24h: {crypto.volume24}</p>
    </div>
  );
}

export default CryptoDetail;
