import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopperTotal = () => {
  const [shoppers, setShoppers] = useState([]);
  const [selectedShopper, setSelectedShopper] = useState('');
  const [totalPurchase, setTotalPurchase] = useState(null);

  useEffect(() => {
    // Fetch the list of shoppers when the component mounts
    fetchShoppers();
  }, []);

  const fetchShoppers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/get_shoppers');
      setShoppers(response.data);
    } catch (error) {
      console.error('Error fetching shoppers:', error);
    }
  };

  const handleShopperChange = (event) => {
    const selectedShopperId = event.target.value;
    setSelectedShopper(selectedShopperId);
    // Reset total purchase when shopper is changed
    setTotalPurchase(null);
  };

  const getTotalPurchase = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/get_total_purchase/${selectedShopper}`);
      setTotalPurchase(response.data.totalPurchase);
    } catch (error) {
      console.error('Error fetching total purchase:', error);
    }
  };

  return (
    <div className='edit-form'>
      <h2>Total Purchase Page</h2>
      <select className="prod-id" value={selectedShopper} onChange={handleShopperChange}>
  <option value="">Select a Shopper</option>
  {shoppers.map((shopper) => (
    <option key={shopper} value={shopper}>
      {shopper}
    </option>
  ))}
</select>
      <button className='submit-button' onClick={getTotalPurchase}>Get Total Purchase</button>
      {totalPurchase !== null && (
        <p>
          Total purchase amount for shopper {selectedShopper}: {totalPurchase}
        </p>
      )}
    </div>
  );
};

export default ShopperTotal;
