import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, cartTotal } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!cartItems.length) return;
    setLoading(true);

    // Build the array that your API expects:
    const items = cartItems.map((item) => ({
      price: item.priceId,           // <-- your Stripe Price ID field
      quantity: item.quantity,
    }));

    try {
      const res = await fetch('/api/create-checkout-session', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ items }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (err) {
      console.error('Error creating checkout session:', err);
      alert('Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Your Cart ({totalQuantity})</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, idx) => (
              <li key={`${item.id}-${item.size}-${idx}`}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  {item.size && <p className="cart-item-size">Size: {item.size}</p>}
                  <p className="cart-item-quantity">Qty: {item.quantity}</p>
                  <p className="cart-item-price">${item.price}</p>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total:</strong> ${cartTotal.toFixed(2)}
          </div>
        </>
      )}

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
