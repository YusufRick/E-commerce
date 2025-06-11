// src/pages/FashionCollection.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartIcon from '../assets/cart_icon.png';
import Cart from '../components/Cart';
import '../Visual.css';

const items = [1, 2, 3, 4].map((i) => ({
  id: i,
  name: `Visual ${i}`,
  description: `$${i * 50 + 50}`,
  image: `/src/assets/visual-${i}.jpg`,
}));

export default function VISUAL() {
  const navigate = useNavigate();
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

      <h2 className="Tittle">VISUAL</h2>

      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="item">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              onClick={() => navigate(`/view_visual/${item.id}`)}
            />
            <p>{item.name}</p>
            <p className="description">{item.desription}</p>

          </div>
        ))}
      </div>
    </div>
  );
}
