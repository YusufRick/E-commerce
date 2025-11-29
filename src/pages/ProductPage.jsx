// src/pages/ProductPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase";

import { CartContext } from "../context/CartContext";
import Cart from "../components/Cart";
import CartIcon from "../assets/cart_icon.png";

import starboiImg from "../assets/newblack1.png";
import starboiblackBack from "../assets/newblack2.png";
import undefinedImg from "../assets/UNDEFINED-Tee.png";
import starboiWhite from "../assets/newwhite1.png";
import starboiWhiteback from "../assets/newwhite2.png";
import sizeChartImg from "../assets/starboisizingchart.png";
import keychainImg from "../assets/keychain.png";

import "../ProductPage.css";
import "../Collection.css";

// Map Firestore filenames -> local assets
const LOCAL_IMAGES = {
  "newblack1.png": starboiImg,
  "newblack2.png": starboiblackBack,
  "UNDEFINED-Tee.png": undefinedImg,
  "newwhite1.png": starboiWhite,
  "newwhite2.png": starboiWhiteback,
  "starboisizingchart.png": sizeChartImg,
  "keychain.png": keychainImg,
};

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems = [] } = useContext(CartContext);

  const [cartOpen, setCartOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load product from Firestore
  useEffect(() => {
    async function fetchProduct() {
      try {
        const db = getFirestore(app);
        const ref = doc(db, "Collection", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setProduct(null);
          setLoading(false);
          return;
        }

        const data = snap.data();

        const rawImages = data.images ?? data.image ?? null;
        let imageKeys = [];

        if (Array.isArray(rawImages)) imageKeys = rawImages;
        else if (typeof rawImages === "string") imageKeys = [rawImages];

        const resolvedImages = imageKeys
          .map((k) => LOCAL_IMAGES[k])
          .filter(Boolean);

        const images =
          resolvedImages.length > 0 ? resolvedImages : [starboiImg];

        const sizes = Array.isArray(data.size)
          ? data.size
          : ["S", "M", "L", "XL", "XXL", "3XL"];

        const sizeChart =
          data.sizeChart && LOCAL_IMAGES[data.sizeChart]
            ? LOCAL_IMAGES[data.sizeChart]
            : null;

        const productObj = {
          id: snap.id,
          name: data.name,
          price: data.price,
          priceId: data.priceId || null,
          description: data.description || "",
          category: (data.collection || "").toUpperCase(),
          sizes,
          images,
          inStock: (data.stock ?? 0) > 0,
          stock: data.stock ?? 0,
          status: data.status || "",
          sizeChart,
        };

        setProduct(productObj);
        setSelectedSize(sizes[0]);
        setActiveImage(0);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setProduct(null);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const cartCount = cartItems.length;

  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      alert("Select a size first.");
      return;
    }

    addToCart({
      ...product,
      size: selectedSize,
      quantity,
      priceId: product.priceId,
    });

    setCartOpen(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white tracking-[0.1em]">LOADING PRODUCT</h1>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white tracking-[0.1em]">PRODUCT NOT FOUND</h1>
          <button
            onClick={() => navigate("/collection")}
            className="text-neutral-400 underline mt-4"
          >
            Back to Collection
          </button>
        </div>
      </main>
    );
  }

  const mainImage = product.images[activeImage] || product.images[0];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Cart */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-neutral-800">
        <div className="flex justify-between px-6 h-16 items-center">
          <button onClick={() => navigate(-1)} className="text-xs text-neutral-400">← BACK</button>

          <span className="text-xs tracking-[0.3em]">PRODUCT</span>

          <button onClick={() => setCartOpen(true)} className="relative">
            <img src={CartIcon} alt="Cart" className="w-7 h-7 rotating-icon" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      <div className="h-16" />

      {/* CONTENT */}
      <div className="max-w-[1200px] mx-auto px-6 pb-20">

        {/* INFO */}
        <section className="border-b border-neutral-800 py-10">
          <p className="text-xs text-neutral-500">{product.category}</p>
          <h1 className="text-4xl tracking-wide mt-1">{product.name}</h1>
          <p className="text-lg mt-3">RM{product.price}</p>
          {product.description && (
            <p className="text-neutral-400 mt-4 max-w-xl">{product.description}</p>
          )}
        </section>

        {/* IMAGES */}
        <section className="py-10">

          <div className="flex justify-center mb-6">
            <img src={mainImage} alt={product.name} className="max-w-md w-full" />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`border ${i === activeImage ? "border-white" : "border-transparent"}`}
                >
                  <img
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

        </section>

        {/* PURCHASE */}
        <section className="space-y-10">

          {/* SIZE */}
          <div>
            <p className="text-xs mb-2">SIZE</p>
            <div className="flex gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`w-12 h-12 border text-xs ${
                    s === selectedSize
                      ? "bg-white text-black"
                      : "border-neutral-700 text-neutral-400"
                  }`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div>
            <p className="text-xs mb-2">QUANTITY</p>
            <div className="flex border w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4">-</button>
              <span className="px-6">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4">+</button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full md:w-80 py-4 text-xs tracking-widest ${
              product.inStock ? "bg-white text-black" : "bg-neutral-800 text-neutral-500"
            }`}
          >
            {product.inStock ? "ADD TO CART" : "SOLD OUT"}
          </button>

          {/* SIZE CHART */}
          {product.sizeChart && (
            <div>
              <p className="text-xs mb-2">SIZE CHART</p>
              <img src={product.sizeChart} alt="Size Chart" className="max-w-md border" />
            </div>
          )}

        </section>
      </div>
    </main>
  );
}
