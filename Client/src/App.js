import React, { useState } from 'react';
import './App.css';
import EditProduct from './Components/editproduct';
import UpdateShipping from './Components/updateshipping';
import Checkout from './Components/checkout';
import NewShipping from './Components/newshipping';
import logo from './Images/Logo.jpeg';
import SaleChecker from './Components/salechecker';
import Home from './Components/home';
import NewProduct from './Components/newproduct';
import AddToBasket from './Components/AddToBasket';

function App() {
  const [activePage, setActivePage] = useState('Home');

  return (
<>
    <header className="header">
    <img src={logo} alt="Logo" />
    <h1>BrewBean's Coffee Shop</h1>
  </header>
    <div className="App">
      <div className="left-side">
        <button onClick={() => setActivePage('Home')} className="nav-button">Home</button>
        <button onClick={() => setActivePage('Edit Product')} className="nav-button">Edit Product</button>
        <button onClick={() => setActivePage('SaleCheck')} className="nav-button">Sale Checker</button>
        <button onClick={() => setActivePage('Checkout')} className="nav-button">Calculate Tax</button>
        <button onClick={() => setActivePage('Orders Status')} className="nav-button">Update Orders Status</button>
        <button onClick={() => setActivePage('Add Product')} className="nav-button">Add a new Product</button>
        <button onClick={() => setActivePage('Add to Basket')} className="nav-button">Add to Basket</button>
      </div>
      <div className="right-side">
        {activePage === 'Home' && <Home />}
        {activePage === 'Edit Product' && <EditProduct />}
        {activePage === 'SaleCheck' && <SaleChecker />}
        {activePage === 'Checkout' && <div className="right-side" id='checkoutpage'><Checkout /></div>}
        {activePage === 'Orders Status' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <UpdateShipping />
            </div>
            <div style={{ flex: 1, borderLeft: '1px solid #ccc', padding: '0 20px' }}>
              <NewShipping />
            </div>
          </div>
        )}
        {activePage === 'Add Product' && <NewProduct />}
        {activePage === 'Add to Basket' && <AddToBasket />}
      </div>
    </div>
    </>
  );
}

export default App;
