import React, { useState } from 'react';
import './App.css';
import EditProduct from './Components/editproduct';
import UpdateShipping from './Components/updateshipping';
import Checkout from './Components/checkout';
import NewShipping from './Components/newshipping';
import logo from './Images/Logo.jpeg';

function App() {
  const [activePage, setActivePage] = useState('Departments');

  return (
<>
    <header className="header">
    <img src={logo} alt="Logo" />
    <h1>BrewBean's Coffee Shop</h1>
  </header>
    <div className="App">
      <div className="left-side">
        <button onClick={() => setActivePage('Departments')} className="nav-button">Departments</button>
        <button onClick={() => setActivePage('Edit Product')} className="nav-button">Edit Product</button>
        <button onClick={() => setActivePage('Basket')} className="nav-button">Basket</button>
        <button onClick={() => setActivePage('Checkout')} className="nav-button">Calculate Tax</button>
        <button onClick={() => setActivePage('Search')} className="nav-button">Search</button>
        <button onClick={() => setActivePage('Account')} className="nav-button">Account</button>
        <button onClick={() => setActivePage('Orders Status')} className="nav-button">Update Orders Status</button>
      </div>
      <div className="right-side">
        {activePage === 'Departments' && <div>Departments Page</div>}
        {activePage === 'Edit Product' && <EditProduct />}
        {activePage === 'Basket' && <div>Basket Page</div>}
        {activePage === 'Checkout' && <div className="right-side" id='checkoutpage'><Checkout /></div>}
        {activePage === 'Search' && <div>Search Page</div>}
        {activePage === 'Account' && <div>Account Page</div>}
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
      </div>
    </div>
    </>
  );
}

export default App;
