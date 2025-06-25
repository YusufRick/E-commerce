import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Try to merge by id+size, otherwise push new
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.id === product.id && p.size === product.size
      );
      if (idx > -1) {
        // increment quantity
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // total price
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}
