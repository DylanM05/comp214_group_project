import React, { useState, useEffect } from 'react';

function Checkout() {
  const [baskets, setBaskets] = useState([]);
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [taxAmount, setTaxAmount] = useState('');
  const [subtotal, setSubtotal] = useState('');

  useEffect(() => {
    const fetchBaskets = async () => {
      const response = await fetch('http://localhost:3000/api/get_all_baskets');
      const data = await response.json();

      setBaskets(data);
    };

    fetchBaskets();
  }, []);

  const handleBasketChange = (event) => {
    const selectedBasket = baskets.find(basket => basket[0] === parseInt(event.target.value));
    setSelectedBasket(selectedBasket);
    setSubtotal(selectedBasket[4]);
    setTaxAmount(''); 
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedBasket) {
      return;
    }
  
    const response = await fetch('http://localhost:3000/api/calculate_tax', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state_code: selectedBasket[14], 
        subtotal: subtotal, 
      }),
    });
  
    const data = await response.json();
  
    setTaxAmount(data.tax_amount);
  };

  return (
    <div>
      <form className="edit-form" onSubmit={handleSubmit}>
      <h2>Basket Tax Calculation Form</h2>
        <label>
          Basket ID:<br/>
          <select className="prod-id" value={selectedBasket?.[0] || ''} onChange={handleBasketChange}>
            {baskets.map(basket => (
              <option key={basket[0]} value={basket[0]}>
                {basket[0]}
              </option>
            ))}
          </select>
        </label>
        {selectedBasket && (
          <>
            <p>Quantity: {selectedBasket[1]}</p>
            <p>Subtotal: {selectedBasket[4]}</p>
            <p>Shipping: {selectedBasket[6]}</p>
            <p>Ship City: {selectedBasket[14]}</p>
            <p>Ship State: {selectedBasket[15]}</p>
          </>
        )}
        <button className="submit-button" type="submit">Calculate Tax</button>
        {taxAmount === 0 ? (
        <>
          <p>Tax Amount: 0</p>
          <p>Total: {selectedBasket[4]}</p>
        </>
      ) : (
        <>
          {taxAmount && <p>Tax Amount: {taxAmount}</p>}
          {taxAmount && <p>Total: {Number(selectedBasket[4]) + Number(taxAmount)}</p>}
        </>
      )}
      </form>
    </div>
  );
}

export default Checkout;
