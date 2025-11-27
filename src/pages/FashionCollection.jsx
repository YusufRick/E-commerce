// src/pages/FashionCollection.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection as fsCollection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "../firebase";

import { CartContext } from "../context/CartContext";
import Cart from "../components/Cart";
import CartIcon from "../assets/cart_icon.png";
import "../Collection.css";

// LOCAL IMAGE IMPORTS
import starboiFront from "../assets/starboitee.png";
import undefinedFront from "../assets/UNDEFINED-Tee.png";
import starboiWhite from "../assets/sbwhitefront.png";

// Map Firestore filenames → imported images
const LOCAL_IMAGES = {
  "starboitee.png": starboiFront,
  "UNDEFINED-Tee.png": undefinedFront,
  "sbwhitefront.png": starboiWhite,
};

export default function FashionCollection() {
  const navigate = useNavigate();
  const { addToCart, cartItems = [] } = useContext(CartContext);

  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedSizes, setSizes] = useState({});
  const [activeCollection, setActiveCollection] = useState("STARBOI"); // "STARBOI" | "UNDEFINED"

  // Load products from Firestore
  useEffect(() => {
    const db = getFirestore(app);

    getDocs(fsCollection(db, "Collection"))
      .then((snap) => {
        const products = snap.docs.map((doc) => {
          const data = doc.data();

          // images field can be:
          //  - array of filenames: ["starboitee.png", "something.png"]
          //  - single string: "starboitee.png"
          //  - undefined
          const rawImages = data.images ?? data.image ?? null;

          let imageKeys = [];
          if (Array.isArray(rawImages)) {
            imageKeys = rawImages;
          } else if (typeof rawImages === "string" && rawImages.trim() !== "") {
            imageKeys = [rawImages];
          }

          // map filenames -> imported images
          const resolvedImages = imageKeys
            .map((key) => LOCAL_IMAGES[key])
            .filter(Boolean);

          // fallback if nothing resolves
          const finalImages =
            resolvedImages.length > 0
              ? resolvedImages
              : [LOCAL_IMAGES["starboitee.png"]];

          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            status: data.status,
            price: data.price,
            priceId: data.priceId,
            sizes: Array.isArray(data.size) ? data.size : [],
            stock: data.stock ?? 0,
            collection: (data.collection || "").toUpperCase(), // e.g. "STARBOI", "UNDEFINED"
            images: finalImages, // array of actual image srcs
          };
        });

        setItems(products);
      })
      .catch(console.error);
  }, []);

  // Filter based on active top tab
  const filteredItems = items.filter(
    (item) => item.collection === activeCollection
  );

  // When the user picks a size
  const handleSizeSelect = (id, size) => {
    setSizes((prev) => ({ ...prev, [id]: size }));
  };

  // Only add to cart if size selected
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
      {/* Cart sidebar */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ================================
          FIXED TOP HEADER
      ================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-neutral-800">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="h-16 md:h-20 flex items-center justify-between">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="text-white text-xs md:text-sm tracking-[0.2em] hover:opacity-70"
            >
              ← BACK
            </button>

            {/* Center title */}
            <h1 className="text-white text-sm md:text-lg tracking-[0.3em]">
              COLLECTION
            </h1>

            {/* Cart button with spinning icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2"
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

      {/* Spacer so content isn't hidden behind fixed header */}
      <div className="h-16 md:h-20" />

      {/* ================================
          SECONDARY NAV: STARBOI / UNDEFINED
      ================================= */}
      <nav className="border-b border-neutral-800">
        <div className="max-w-[1600px] mx-auto px-8 flex justify-center gap-10 py-5">
          {/* STARBOI tab */}
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

          {/* UNDEFINED tab */}
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

      {/* ================================
          HERO SECTION
      ================================= */}
      <section className="pt-10 pb-10 px-8 max-w-[1600px] mx-auto">
        <p className="text-xs tracking-[0.25em] text-neutral-400 mb-3">
          SS25 COLLECTION
        </p>

        <h2 className="text-4xl md:text-6xl font-bold tracking-[0.05em] leading-tight mb-4">
          NEW <br /> ARRIVALS
        </h2>

        <p className="text-neutral-400 max-w-md text-sm md:text-base leading-relaxed">
          Explore our latest collection of premium streetwear. Designed for
          those who define their own style.
        </p>
      </section>

      {/* ================================
          PRODUCT GRID
      ================================= */}
      <section className="pb-20 px-8 max-w-[1600px] mx-auto">
        {/* Item count */}
        <div className="flex justify-end mb-6">
          <p className="text-xs tracking-[0.2em] text-neutral-500">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "ITEM" : "ITEMS"}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item) => {
            const frontImage = item.images[0]; // first image
            return (
              <div key={item.id} className="group">
                {/* Product image */}
                <div
                  className="relative aspect-[3/4] bg-neutral-900 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img
                    src={frontImage}
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

                {/* Name */}
                <h3 className="text-xs md:text-sm tracking-[0.15em] mt-3 uppercase group-hover:text-neutral-300">
                  {item.name}
                </h3>

                {/* Price */}
                <p className="text-xs tracking-[0.1em] text-neutral-400">
                  RM{item.price}
                </p>

                {/* Size dropdown */}
                {item.sizes.length > 0 && (
                  <div className="size-dropdown-wrapper mt-2">
                    <select
                      className="size-dropdown"
                      value={selectedSizes[item.id] || ""}
                      onChange={(e) =>
                        handleSizeSelect(item.id, e.target.value)
                      }
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
            );
          })}
        </div>
      </section>

      {/* ================================
          FOOTER
      ================================= */}
      <footer className="border-t border-neutral-800 py-10 text-center text-neutral-500 text-xs tracking-[0.2em]">
        © {new Date().getFullYear()} KASAHARA
      </footer>
    </div>
  );
}