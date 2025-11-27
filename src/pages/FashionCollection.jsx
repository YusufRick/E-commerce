// src/pages/FashionCollection.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../firebase";

import { CartContext } from "../context/CartContext";
import Cart from "../components/Cart";
import CartIcon from "../assets/cart_icon.png"; // spinning Kasahara icon
import "../Collection.css";

import undefinedTee from "../assets/starboitee.png";

// Map Firestore image names to local assets
const LOCAL_IMAGES = {
  "starboitee.png": undefinedTee,
  // add more mappings here if needed
};

export default function FashionCollection() {
  const navigate = useNavigate();
  const { addToCart, cartItems = [] } = useContext(CartContext);

  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedSizes, setSizes] = useState({}); // { productId: size }
  const [activeCollection, setActiveCollection] = useState("STARBOI"); // STARBOI | UNDEFINED (for nav highlight)

  // Load products from Firestore
  useEffect(() => {
    const db = getFirestore(app);

    getDocs(collection(db, "Collection"))
      .then((snap) => {
        const products = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            status: data.status,
            price: data.price,
            priceId: data.priceId,
            sizes: Array.isArray(data.size) ? data.size : [],
            image: LOCAL_IMAGES[data.image] || LOCAL_IMAGES["starboitee.png"],
            stock: data.stock ?? 0,
          };
        });

        setItems(products);
      })
      .catch(console.error);
  }, []);

  // Handle size selection
  const handleSizeSelect = (id, size) => {
    setSizes((prev) => ({ ...prev, [id]: size }));
  };

  // Add to cart
  const handleAddToCart = (item) => {
    const size = selectedSizes[item.id];

    if (!size) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart({ ...item, size });
  };

  const cartCount = cartItems.length;

  return (
    <div className="collection-page bg-black text-white min-h-screen">
      {/* CART SIDEBAR */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ─────────────────────────────
          FIXED HEADER (centered title)
          ───────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-neutral-800">
        <div className="max-w-[1600px] mx-auto w-full px-8">
          <div className="h-16 md:h-20 flex items-center justify-between">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="text-white text-xs md:text-sm tracking-[0.2em] hover:opacity-70"
            >
              ← BACK
            </button>

            {/* Center title */}
            <h1 className="text-white text-sm md:text-lg tracking-[0.3em] font-semibold text-center">
              COLLECTION
            </h1>

            {/* Cart button with spinning icon */}
            <button
              className="relative p-2"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <img
                src={CartIcon}
                alt="Cart"
                className="rotating-icon"
                style={{ width: "28px", height: "28px" }}
              />
              <span className="absolute -top-1 -right-2 text-[10px] bg-white text-black px-1 rounded">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer so content doesn't hide under fixed header */}
      <div className="h-16 md:h-20" />

      {/* ─────────────────────────────
          SECONDARY NAV: STARBOI / UNDEFINED
          ───────────────────────────── */}
      <nav className="w-full border-b border-neutral-800">
        <div className="max-w-[1600px] mx-auto px-8 flex items-center justify-center gap-10 py-4 md:py-5">
          {/* STARBOI */}
          <button
            onClick={() => setActiveCollection("STARBOI")}
            className={`text-xs tracking-[0.25em] pb-1 border-b-2 transition-colors ${
              activeCollection === "STARBOI"
                ? "text-white border-white"
                : "text-neutral-500 border-transparent hover:text-neutral-300"
            }`}
          >
            STARBOI
          </button>

          {/* UNDEFINED */}
          <button
            onClick={() => setActiveCollection("UNDEFINED")}
            className={`text-xs tracking-[0.25em] pb-1 border-b-2 transition-colors ${
              activeCollection === "UNDEFINED"
                ? "text-white border-white"
                : "text-neutral-500 border-transparent hover:text-neutral-300"
            }`}
          >
            UNDEFINED
          </button>
        </div>
      </nav>

      {/* ─────────────────────────────
          HERO SECTION
          ───────────────────────────── */}
      <section className="pt-8 md:pt-10 pb-10 px-8 max-w-[1600px] mx-auto">
        <p className="text-xs tracking-[0.25em] text-neutral-400 mb-4">
          SS25 COLLECTION
        </p>

        <h2 className="text-4xl md:text-6xl font-bold tracking-[0.05em] text-white leading-tight mb-4">
          NEW <br /> ARRIVALS
        </h2>

        <p className="text-neutral-400 max-w-md leading-relaxed text-sm md:text-base">
          Explore our latest collection of premium streetwear. Designed for
          those who define their own style.
        </p>
      </section>

      {/* ─────────────────────────────
          PRODUCTS GRID
          ───────────────────────────── */}
      <section className="pb-20 px-8 max-w-[1600px] mx-auto">
        {/* Item count row */}
        <div className="flex items-center justify-end mb-6">
          <p className="text-xs tracking-[0.2em] text-neutral-500">
            {items.length} {items.length === 1 ? "ITEM" : "ITEMS"}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              {/* Product image */}
              <div
                className="relative aspect-[3/4] bg-neutral-900 overflow-hidden"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />

                {item.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-xs tracking-[0.2em] text-white">
                      SOLD OUT
                    </span>
                  </div>
                )}
              </div>

              {/* Name + price */}
              <h3 className="text-xs md:text-sm tracking-[0.15em] text-white mt-3 group-hover:text-neutral-300 transition-colors uppercase">
                {item.name}
              </h3>
              <p className="text-xs tracking-[0.1em] text-neutral-400">
                RM{item.price}
              </p>

              {/* Sizes */}
              {item.sizes.length > 0 && (
                <div className="size-dropdown-wrapper mt-2">
                  <select
                    className="size-dropdown"
                    value={selectedSizes[item.id] || ""}
                    onChange={(e) => handleSizeSelect(item.id, e.target.value)}
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
              )}

              {/* Add to cart */}
              <button
                className="add-cart-btn mt-3"
                disabled={item.stock === 0}
                onClick={() => handleAddToCart(item)}
              >
                {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────
          FOOTER
          ───────────────────────────── */}
      <footer className="border-t border-neutral-800 py-10 text-center text-neutral-500 text-xs tracking-[0.2em]">
        © {new Date().getFullYear()} KASAHARA
      </footer>
    </div>
  );
}
