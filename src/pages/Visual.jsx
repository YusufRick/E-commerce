// src/pages/FashionCollection.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../context/CartContext';
import CartIcon from '../assets/cart_icon.png';
import Cart from '../components/Cart';
import visual1 from '../assets/visual1.png';
import visual2 from '../assets/visual2.gif';
import visual3 from '../assets/visual3.png';

import '../Visual.css';

const items = [
  { id: 1, name: 'Visual 1', description: '', image: visual1 },
  { id: 2, name: 'Visual 2', description: '', image: visual2 },
  { id: 3, name: 'Visual 3', description: '', image: visual3 },

];

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
            <p className="description">{item.description}</p>

          </div>
        ))}
      </div>
    </div>
  );
}
