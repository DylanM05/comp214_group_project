import React, { useState } from 'react';
import axios from 'axios';

function NewProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [price, setPrice] = useState(0);
  const [active, setActive] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/addNewProduct', {
        productName,
        description,
        productImage,
        price,
        active
      });
      alert('Product added successfully.');
    } catch (error) {
      alert('Error adding the new product. Please try again.');
    }
  };

  return (
    <div className='edit-form'>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <br />
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        <br />
        <label>Description:</label>
        <br />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br />
        <label>Product Image:</label>
        <br />
        <input  type="text" value={productImage} onChange={(e) => setProductImage(e.target.value)} required />
        <br />
        <label>Price:</label>
        <br />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <br />
        <label>Active:</label>
        <br />
        <input type="number" value={active} onChange={(e) => setActive(e.target.value)} required />
        <br />
        <button className="submit-button" type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default NewProduct;
