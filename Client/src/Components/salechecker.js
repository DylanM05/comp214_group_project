import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SaleChecker() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [date, setDate] = useState('');
  const [saleStatus, setSaleStatus] = useState('');
  const [productId, setProductId] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/getProductidname')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        if (data.length > 0) {
          setProductId(data[0][0]);
        }
      });
  }, []);

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    setSelectedProduct(selectedProductId);
    setProductId(selectedProductId);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleCheckSale = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/checkProductSale/${selectedProduct}/${date}`);
      setSaleStatus(response.data.saleStatus);
    } catch (error) {
      console.error('Error checking sale:', error);
    }
  };

  return (
    <div className="edit-form">
      <div>
        <h1 className="title">Product Sale Checker</h1>
        <div>
          <label htmlFor="productSelect">Select Product:</label>
          <br/>
          <select
            id="productSelect"
            className="prod-id"
            value={productId}
            onChange={handleProductChange}
          >
            {products.map(product => (
              <option key={product[0]} value={product[0]}>
                {product[0]} - {product[1]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dateInput">Enter date (YYYY-MM-DD):</label>
          <br/>
          <input type="text" id="dateInput" value={date} onChange={handleDateChange} />
        </div>
        <div>
          <button className="submit-button" onClick={handleCheckSale}>Check Sale</button>
        </div>
        {saleStatus && <div>Sale Status: {saleStatus}</div>}
      </div>
    </div>
  );
}

export default SaleChecker;
