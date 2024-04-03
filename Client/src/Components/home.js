import React from 'react';

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Our Coffee Shop</h1>
      </header>
      <section className="home-section">
        <h2>Our Specialties</h2>
        <p>We serve the best coffee in town. Try our Espresso, Cappuccino, Latte, and Mocha.</p>
      </section>
      <section className="home-section">
        <h2>Visit Us</h2>
        <p>We're open from 8am to 5pm, Monday to Friday. Come and enjoy a cup of coffee with us!</p>
      </section>
    </div>
  );
}

export default Home;