// src/components/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, cartTotal } = useContext(CartContext);

  const handleBuy = async () => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // redirect to Stripe checkout
    } else {
      console.error('Checkout URL not found:', data);
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
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
                  {item.size && (
                    <p className="cart-item-size">Size: {item.size}</p>
                  )}
                  <p className="cart-item-quantity">
                    Qty: {item.quantity}
                  </p>
                  <p className="cart-item-price">Price: {item.price}</p>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </>
      )}

      <button
        className="checkout-btn"
        onClick={handleBuy}
        disabled={cartItems.length === 0}
      >
        Checkout
      </button>
    </div>
  );
}
