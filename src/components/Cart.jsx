import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart } = useContext(CartContext);

  // ← move the checkout handler here
  const handleBuy = () => {
    window.open(
      'https://buy.stripe.com/fZu28r6e27Cx0KHbll00',
      '_blank'
    );
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map(item => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} loading="lazy" />
              <div>
                <p>{item.name}</p>
                <p>{item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button className="checkout-btn" onClick={handleBuy}>
        Checkout
      </button>
    </div>
  );
}
