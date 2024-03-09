import React, { useState } from 'react';
import './App.css';

function EditProduct() {
  const [productId, setProductId] = useState('');
  const [newDescription, setNewDescription] = useState('');

  
  const handleSubmit = () => {
    fetch('http://localhost:3001/api/updateProductDescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productId,
        newDescription: newDescription,
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };  
    console.log(`Updating product ${productId} with new description: ${newDescription}`);


  return (
    <div>
      <input type="text" value={productId} onChange={e => setProductId(e.target.value)} placeholder="Product ID" />
      <input type="text" value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="New Description" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState('Departments');

  return (
    <div className="App">
      <div className="left-side">
        <button onClick={() => setActivePage('Departments')}>Departments</button>
        <button onClick={() => setActivePage('Edit Product')}>Edit Product</button>
        <button onClick={() => setActivePage('Basket')}>Basket</button>
        <button onClick={() => setActivePage('Checkout')}>Checkout</button>
        <button onClick={() => setActivePage('Search')}>Search</button>
        <button onClick={() => setActivePage('Account')}>Account</button>
        <button onClick={() => setActivePage('Orders Status')}>Orders Status</button>
      </div>
      <div className="right-side">
        {activePage === 'Departments' && <div>Departments Page</div>}
        {activePage === 'Edit Product' && <EditProduct />}
        {activePage === 'Basket' && <div>Basket Page</div>}
        {activePage === 'Checkout' && <div>Checkout Page</div>}
        {activePage === 'Search' && <div>Search Page</div>}
        {activePage === 'Account' && <div>Account Page</div>}
        {activePage === 'Orders Status' && <div>Orders Status Page</div>}
      </div>
    </div>
  );
}

export default App;