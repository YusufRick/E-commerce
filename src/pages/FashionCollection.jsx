// src/pages/FashionCollection.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartIcon from '../assets/cart_icon.png';
import Cart from '../components/Cart';
import '../Collection.css';

const items = [
  { id: 1, name: 'Tee 1', price: '', image:  ""},
  { id: 2, name: 'Tee 2', price: '', image: "" },
  { id: 3, name: 'Tee 3', price: '', image: "" },

];

export default function FashionCollection() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="collection-page">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Cart overlay/modal */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Header with cart icon */}
      <header className="header">
        <button
          className="cart-btn"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
        >
          <img src={CartIcon} alt="Cart" className="cart-icon" />
        </button>
      </header>

      <h2 className="Tittle">COLLECTION</h2>

      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="item">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              onClick={() => navigate(`/product/${item.id}`)}
            />
            <p>{item.name}</p>
            <p className="price">{item.price}</p>
            <button
              className="add-cart-btn"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
