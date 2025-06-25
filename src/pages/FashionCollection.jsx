// src/pages/FashionCollection.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../firebase";            // <-- your initialized app
import { CartContext } from "../context/CartContext";
import Cart from "../components/Cart";
import CartIcon from "../assets/cart_icon.png";
import "../Collection.css";

import image1 from "../assets/visual1.png";

// …and so on
const LOCAL_IMAGES = { "image1.png": image1, /*…*/ };

export default function FashionCollection() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [cartOpen, setCartOpen]       = useState(false);
  const [items, setItems]             = useState([]);
  const [selectedSizes, setSizes]     = useState({}); // { [id]: "M", … }
  const SIZE_OPTIONS = ["S", "M", "L"];

  // 1️⃣ Load products from Firestore
  useEffect(() => {
    const db = getFirestore(app);
    getDocs(collection(db, "Collection"))
      .then((snap) => {
        const products = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id:          doc.id,
            name:        data.name,
            description: data.description,
            price:       data.price,
            // if you stored a single `size` field, wrap it in an array:
            sizes:       data.sizes ?? (data.size ? [data.size] : []),
            // pick the local import (or fallback to a placeholder)
            image:       LOCAL_IMAGES[data.image] || LOCAL_IMAGES["image1.png"],
          };
        });
        setItems(products);
      })
      .catch(console.error);
  }, []);

  // 2️⃣ Handler for size dropdown
  const handleSizeSelect = (id, size) => {
    setSizes((prev) => ({ ...prev, [id]: size }));
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

      <h2 className="Tittle">COLLECTION</h2>

      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="item">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              onClick={() => navigate(`/product/${item.id}`)}
            />

            <p className="name">{item.name}</p>
            <p className="description">{item.description}</p>
            <p className="price">${item.price}</p>

            {/* 3️⃣ Size selector */}
            {item.sizes.length > 0 && (
              <div className="size-dropdown-wrapper">
                <select
                  className="size-dropdown"
                  value={selectedSizes[item.id] || ""}
                  onChange={(e) => handleSizeSelect(item.id, e.target.value)}
                >
                  <option value="" disabled>
                    Size
                  </option>
                  {SIZE_OPTIONS.map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              className="add-cart-btn"
              onClick={() =>
                addToCart({
                  ...item,
                  size: selectedSizes[item.id] || null,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
