import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddToBasket() {
  const [products, setProducts] = useState([]);
  const [idproduct, setProductId] = useState('');
  const [basketIds, setBasketIds] = useState([]);
  const [idbasket, setBasketId] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sizeCode, setSizeCode] = useState(1);
  const [formCode, setFormCode] = useState(3); 

  useEffect(() => {
    // Fetch product IDs and names
    fetchProducts();
    // Fetch basket IDs
    fetchBasketIds();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:3000/api/getProductidname')
      .then(response => {
        setProducts(response.data);
        if (response.data.length > 0) {
          setProductId(response.data[0][0]);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const fetchBasketIds = () => {
    axios.get('http://localhost:3000/api/getBasketId')
      .then(response => {
        setBasketIds(response.data);
        if (response.data.length > 0) {
          setBasketId(response.data[0]);
        }
      })
      .catch(error => console.error('Error fetching basket IDs:', error));
  };

  const handleProductChange = (e) => {
    setProductId(e.target.value);
    fetchProductPrice(e.target.value);
  };

  const fetchProductPrice = (id) => {
    axios.get(`http://localhost:3000/api/getProductPrice/${id}`)
      .then(response => {
        setPrice(response.data.price);
      })
      .catch(error => console.error('Error fetching product price:', error));
  };

  const handleAddToBasket = () => {
    axios.post('http://localhost:3000/api/addToBasket', {
      idproduct: Number(idproduct),
      idbasket: Number(idbasket),
      price,
      quantity,
      sizeCode,
      formCode
    })
    .then(() => alert('Product added to basket successfully'))
    .catch(error => alert('Error adding product to basket. Please try again.'));
  };
  
  return (
    <div className='edit-form'>
      <h1>Add Product To a Basket</h1>
      <div>
      <label htmlFor="productSelect">Select Product:</label>
        <br />
        <select
          id="productSelect"
          className="prod-id"
          value={idproduct}
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
        <label htmlFor="basketSelect">Select Basket ID:</label>
        <br />
        <select
          id="basketSelect"
          className="prod-id"
          value={idbasket}
          onChange={e => setBasketId(e.target.value)}
        >
          {basketIds.map(id => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="priceInput">Price:</label>
        <br />
        <input
          id="priceInput"
          value={price}
          readOnly
          onChange={e => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="quantityInput">Quantity:</label>
        <br />
        <input
          type="number"
          id="quantityInput"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sizeCodeInput">Size Code:</label>
        <br />
        <input
          type="number"
          id="sizeCodeInput"
          value={sizeCode}
          onChange={e => setSizeCode(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="formCodeInput">Form Code:</label>
        <br />
        <input
          type="number"
          id="formCodeInput"
          value={formCode}
          onChange={e => setFormCode(e.target.value)}
        />
      </div>
      <div>
        <button className="submit-button"  onClick={handleAddToBasket}>Add to Basket</button>
      </div>
    </div>
  );
}

export default AddToBasket;
