import React, { useState } from 'react';

function EditProduct() {
    const [productId, setProductId] = useState('');
    const [newDescription, setNewDescription] = useState('');
  
    
    const handleSubmit = (event) => {
      event.preventDefault();
      fetch('http://localhost:3000/api/updateProductDescription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            IDPRODUCT: productId,
            DESCRIPTION: newDescription,
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          alert('Product Description updated');
          setProductId('');
          setNewDescription('');
        })
        .catch(error => console.error('Error:', error));
  };
  
      return (
        <div className="shop-page">
          <h1 className="title">Edit Product</h1>
          <form onSubmit={handleSubmit} className="edit-form">
            <input type="text" value={productId} onChange={e => setProductId(e.target.value)} placeholder="Product ID" className="prod-id" />
            <input type="text" value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="New Description" className="new-disc" />
            <button type="submit" className="submit-button">Update Description</button>
          </form>
        </div>
      );
  }

export default EditProduct;