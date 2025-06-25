// src/pages/ProductPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate }            from 'react-router-dom';
import { getFirestore, doc, getDoc }         from 'firebase/firestore';
import { app }                               from '../firebase';
import { CartContext }                       from '../context/CartContext';
import Cart                                  from '../components/Cart';
import CartIcon                              from '../assets/cart_icon.png';
import "../ProductPage.css";

import fashion1Img from '../assets/visual1.png';
// …import any other local images here…

import '../Collection.css'; // reuse your existing styles

const LOCAL_IMAGES = {
  'fashion-1.jpg': fashion1Img,
  // …map other filenames…
};

export default function ProductPage() {
  const { id }             = useParams();
  const navigate           = useNavigate();
  const { addToCart }      = useContext(CartContext);

  const [cartOpen, setCartOpen]     = useState(false);
  const [item, setItem]             = useState(null);
  const [error, setError]           = useState('');
  const [chosenSize, setChosenSize] = useState('');

  // Load the product data
  useEffect(() => {
    const db = getFirestore(app);
    getDoc(doc(db, 'Collection', id))
      .then(snap => {
        if (!snap.exists()) {
          setError(`No product found with id="${id}"`);
          return;
        }
        const data = snap.data();
        setItem({
          id:          snap.id,
          name:        data.name,
          description: data.description,
          price:       data.price,
          sizes:       Array.isArray(data.sizes) ? data.sizes : ['S','M','L'],
          image:       LOCAL_IMAGES[data.image] || fashion1Img,
        });
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load product.');
      });
  }, [id]);

  if (error) {
    return <div style={{ padding: '2rem', color: 'tomato' }}>🚨 {error}</div>;
  }
  if (!item) {
    return <div className="loader">Loading…</div>;
  }

  // Safe add-to-cart
  const handleAddToCart = () => {
    if (!chosenSize) {
      alert('Please select a size before adding to cart.');
      return;
    }
    addToCart({ ...item, size: chosenSize });
  };

  return (
    <div className="collection-page">
      {/* ← Back */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Cart sidebar */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Header + cart icon */}
      <header className="header">
        <button
          className="cart-btn"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
        >
          <img src={CartIcon} alt="Cart" className="cart-icon" />
        </button>
      </header>

      {/* Title */}
      <h2 className="Tittle">{item.name}</h2>

      <div className="product-details">
        {/* Left: the image */}
        <img src={item.image} alt={item.name} loading="lazy" />

        {/* Right: info column */}
        <div className="info">
          <p className="description">{item.description}</p>
          <p className="price">Price: ${item.price}</p>

          {/* Size dropdown */}
          <div className="size-dropdown-wrapper">
            <select
              className="size-dropdown"
              value={chosenSize}
              onChange={e => setChosenSize(e.target.value)}
            >
              <option value="" disabled>
                Size
              </option>
              {item.sizes.map((sz) => (
                <option key={sz} value={sz}>
                  {sz}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart */}
          <button
            className="add-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
