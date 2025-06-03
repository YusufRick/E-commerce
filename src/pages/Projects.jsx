// src/pages/Projects.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartIcon from '../assets/cart_icon.png';
import Cart from '../components/Cart';

const items = [1, 2, 3, 4].map((i) => ({
  id: i,
  name: `Projects ${i}`,
  price: `$${i * 50 + 50}`,
  image: `/src/assets/projects-${i}.jpg`,
}));

export default function Projects() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="card">
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

      <h2 className="Tittle">PROJECTS</h2>

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
            
          </div>
        ))}
      </div>
    </div>
  );
}
