import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, cartTotal } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!cartItems.length) return;
    setLoading(true);

    // map your cartItems into the shape the server expects:
    const items = cartItems.map(item => ({
      name:     item.name,
      price:    item.price,      // numeric, e.g. 89.00
      quantity: item.quantity || 1
    }));

    console.log('👉 sending to /api:', items);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ items })
      });
      
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = json.url;
    } catch (err) {
      console.error('Error creating checkout session:', err);
      alert('Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity||1), 0);

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Your Cart ({totalQuantity})</h2>

      {cartItems.length === 0
        ? <p>Your cart is empty.</p>
        : (
          <>
            <ul className="cart-list">
              {cartItems.map((item, idx) => (
                <li key={`${item.id}-${item.size}-${idx}`}>
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="cart-item-info">
                    <p>{item.name}</p>
                    {item.size && <p>Size: {item.size}</p>}
                    <p>Qty: {item.quantity || 1}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <strong>Total:</strong> ${cartTotal.toFixed(2)}
            </div>
          </>
        )
      }

      <button
        className="checkout-btn"
        onClick={handleBuy}
        disabled={loading || cartItems.length === 0}
      >
        {loading ? 'Redirecting…' : 'Checkout'}
      </button>
    </div>
  );
}
