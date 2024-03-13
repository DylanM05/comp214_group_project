import React, { useState, useEffect } from 'react';
import '../App.css';

function EditProduct() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [newDescription, setNewDescription] = useState('');

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

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/api/updateProductDescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        IDPRODUCT: Number(productId),
        DESCRIPTION: newDescription,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <label htmlFor="productSelect">Select Product:</label>
      <select
        id="productSelect"
        className="prod-id"
        value={productId}
        onChange={e => setProductId(e.target.value)}
      >
        {products.map(product => (
          <option key={product[0]} value={product[0]}>
            {product[0]} - {product[1]}
          </option>
        ))}
      </select>

      <label htmlFor="newDescription">New Description:</label>
      <input
        id="newDescription"
        className="new-disc"
        type="text"
        value={newDescription}
        onChange={e => setNewDescription(e.target.value)}
      />
      <button type="submit" className="submit-button">
        Update Description
      </button>
    </form>
  );
}

export default EditProduct;
