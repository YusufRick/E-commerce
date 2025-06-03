import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { xor } from 'three/examples/jsm/nodes/Nodes.js';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) =>{
    setCartItems((prev) => [...prev, product]);
    
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
    });

  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
