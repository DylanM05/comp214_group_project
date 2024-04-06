import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockChecker = () => {
  const [baskets, setBaskets] = useState([]);
  const [selectedBasket, setSelectedBasket] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    // Fetch all baskets when component mounts
    getAllBaskets();
  }, []);

  const getAllBaskets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/get_all_baskets');
      setBaskets(response.data);
    } catch (error) {
      console.error('Error fetching baskets:', error);
    }
  };

  const getBasketItems = async (basketId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/get_basket_items/${basketId}`);
      setBasketItems(response.data);
    } catch (error) {
      console.error('Error fetching basket items:', error);
    }
  };

  const handleBasketChange = (event) => {
    const selectedBasketId = event.target.value;
    setSelectedBasket(selectedBasketId);
    setStockStatus('');
    getBasketItems(selectedBasketId);
  };
  

  const checkStock = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/check_stock', {
        basketNum: selectedBasket
      });
      setStockStatus(response.data.stockStatus);
    } catch (error) {
      console.error('Error checking stock:', error);
    }
  };

  return (
    <div className='edit-form'>
      <h2>Stock Checker</h2>
      <select value={selectedBasket} onChange={handleBasketChange}>
        <option value="">Select a Basket</option>
        {baskets.map((basket) => (
          <option key={basket[0]} value={basket[0]}>
            {basket[0]}
          </option>
        ))}
      </select>
      <button className='submit-button' onClick={checkStock}>Check Stock</button>
      {stockStatus && (
        <p>
          Stock status for basket {selectedBasket}: {stockStatus}
        </p>
      )}

<h3>Basket Items</h3>
<ul>
  {basketItems.map((item, index) => (
    <li key={index}>
      ID: {item[0]}, Product ID: {item[1]}, Price: {item[2]}, Quantity: {item[3]}
    </li>
  ))}
</ul>

    </div>
  );
};

export default StockChecker;
