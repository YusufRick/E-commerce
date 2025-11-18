// src/pages/ProductPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate }            from 'react-router-dom';
import { getFirestore, doc, getDoc }         from 'firebase/firestore';
import { app }                               from '../firebase';
import { CartContext }                       from '../context/CartContext';
import Cart                                  from '../components/Cart';
import CartIcon                              from '../assets/cart_icon.png';
import fashion1Img                           from '../assets/starboitee.png';
import sizeChartImg                          from '../assets/sizechart.png'; // NEW import
import "../ProductPage.css";
import '../Collection.css';

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
          priceId:     data.priceId,
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

  const handleAddToCart = () => {
    if (!chosenSize) {
      alert('Please select a size before adding to cart.');
      return;
    }
    addToCart({ ...item, size: chosenSize });
  };

  return (
    <div className="collection-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <header className="header">
        <button
          className="cart-btn"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
        >
          <img src={CartIcon} alt="Cart" className="cart-icon" />
        </button>
      </header>

      <h2 className="Tittle">{item.name}</h2>

      <div className="product-details">
        <img src={item.image} alt={item.name} loading="lazy" className="product-image" />

        <div className="info-and-chart">
          <div className="info">
            <p className="description">{item.description}</p>
            <p className="price">Price: ${item.price}</p>

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

            <button className="add-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

          <img
            src={sizeChartImg}
            alt="Size Chart"
            className="size-chart-img"
            loading="lazy"
          />
        </div>
      </div>

      {/* Inline CSS styles */}
      <style>{`
        .product-details {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 2rem;
          align-items: center;
        }

        .product-image {
          width: 100%;
          max-width: 400px;
          object-fit: contain;
        }

        .info-and-chart {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
          width: 100%;
        }

        .info {
          max-width: 600px;
          width: 100%;
        }

        .size-chart-img {
          width: 100%;
          max-width: 400px;
          height: auto;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .size-dropdown-wrapper {
          margin: 1rem 0;
        }

        .size-dropdown {
          padding: 0.5rem;
          font-size: 1rem;
        }

        .add-cart-btn {
          padding: 0.75rem 1.5rem;
          background-color: black;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 4px;
        }

        @media screen and (min-width: 768px) {
          .product-details {
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
          }

          .info-and-chart {
            flex-direction: column;
            align-items: flex-start;
            margin-left: 2rem;
          }

          .size-chart-img {
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
