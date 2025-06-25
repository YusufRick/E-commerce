// src/pages/ProductPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate }            from 'react-router-dom';
import { getFirestore, doc, getDoc }         from 'firebase/firestore';
import { app }                               from '../firebase';
import { CartContext }                       from '../context/CartContext';
import Cart                                  from '../components/Cart';
import CartIcon                              from '../assets/cart_icon.png';

// 👇 local imports of your three tee images
import fashion1Img from '../assets/visual1.png';



import '../Collection.css'; // re-use your existing styles

// map the `image` field in Firestore → your imported asset
const LOCAL_IMAGES = {
  'fashion-1.jpg': fashion1Img,
};

export default function ProductPage() {
  const { id }             = useParams();
  const navigate           = useNavigate();
  const { addToCart }      = useContext(CartContext);
  const [cartOpen, setCartOpen]       = useState(false);
  const [item, setItem]               = useState(null);
  const [error, setError]= useState('');
  const [chosenSize, setChosenSize]   = useState('');

  useEffect(() => {
    // load the product doc from Firestore:
    const db = getFirestore(app);
    getDoc(doc(db, 'Collection', id))
      .then((snap) => {
        if (!snap.exists()) {
          console.warn(`No product found with id=${id}`);
          return;
        }
        const data = snap.data();
        setItem({
          id:          snap.id,
          name:        data.name,
          description: data.description,
          price:       data.price,
          sizes:       Array.isArray(data.sizes) ? data.sizes : ['S','M','L'],
          image:       LOCAL_IMAGES[data.image] || Object.values(LOCAL_IMAGES)[0],
        });
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
      });
  }, [id]);

  if (error) return <div style={{ padding: '2rem', color: 'tomato' }}>🚨 {error}</div>;
  if (!item)  return <div className="loader">Loading…</div>;

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
          <p className="price">${item.price}</p>

          <div className='size-dropdown-wrapper'>
          <select className="size-dropdown"
            value={chosenSize}
            onChange={(e) => setChosenSize(e.target.value)}
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

          <button
            className="add-cart-btn"
            onClick={() =>
              addToCart({
                ...item,
                size: chosenSize,
              })
            }
            disabled={!chosenSize}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
