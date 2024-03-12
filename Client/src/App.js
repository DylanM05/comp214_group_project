import React, { useState } from 'react';
import './App.css';
import EditProduct from './Components/editproduct';

function App() {
  const [activePage, setActivePage] = useState('Departments');

  return (
    <div className="App">
     <div className="left-side">
  <button onClick={() => setActivePage('Departments')} className="nav-button">Departments</button>
  <button onClick={() => setActivePage('Edit Product')} className="nav-button">Edit Product</button>
  <button onClick={() => setActivePage('Basket')} className="nav-button">Basket</button>
  <button onClick={() => setActivePage('Checkout')} className="nav-button">Checkout</button>
  <button onClick={() => setActivePage('Search')} className="nav-button">Search</button>
  <button onClick={() => setActivePage('Account')} className="nav-button">Account</button>
  <button onClick={() => setActivePage('Orders Status')} className="nav-button">Orders Status</button>
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