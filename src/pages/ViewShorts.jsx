// src/pages/ViewShorts.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartIcon from '../assets/cart_icon.png';
import Cart from '../components/Cart';

const shorts = {
  1: {
    id: 1,
    name: 'Shorts 1',
    video: '/src/assets/shorts-1.mp4',
    thumbnail: '/src/assets/shorts-1.jpg',
  },
  2: {
    id: 2,
    name: 'Shorts 2',
    video: '/src/assets/shorts-2.mp4',
    thumbnail: '/src/assets/shorts-2.jpg',
  },
  3: {
    id: 3,
    name: 'Shorts 3',
    video: '/src/assets/shorts-3.mp4',
    thumbnail: '/src/assets/shorts-3.jpg',
  },
  4: {
    id: 4,
    name: 'Shorts 4',
    video: '/src/assets/shorts-4.mp4',
    thumbnail: '/src/assets/shorts-4.jpg',
  },
};

export default function ViewShorts() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);

  const short = shorts[id];
  if (!short) {
    return <p>Short film not found.</p>;
  }

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

      <h2 className="Tittle">{short.name}</h2>

      {/* Video player */}
      <video className='vid'
        src={short.video}
        poster={short.thumbnail}
        controls
        autoPlay
        style={{ width: '100%', maxWidth: '800px' }}
      >
        Sorry, your browser doesn’t support embedded videos.
      </video>
    </div>
  );
}
