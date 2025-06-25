// src/context/CartContext.jsx
import React, { createContext, useState, useMemo } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    if (!product.size) {
      toast.error('Please select a size before adding to cart.', {
        position: 'top-right',
        autoClose: 2000,
      });
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === product.size
      );
      if (existing) {
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success(
      `${product.name} (${product.size}) added to cart!`,
      {
        position: 'top-right',
        autoClose: 2000,
      }
    );
  };

  const removeFromCart = (product) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const unit = parseFloat(
          item.price.toString().replace(/[^0-9.-]+/g, '')
        );
        return sum + (isNaN(unit) ? 0 : unit * item.quantity);
      }, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
