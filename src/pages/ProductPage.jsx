// src/pages/ProductPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase";

import { CartContext } from "../context/CartContext";
import Cart from "../components/Cart";
import CartIcon from "../assets/cart_icon.png";

import starboiImg from "../assets/starboitee.png";
import undefinedImg from "../assets/UNDEFINED-Tee.png";
import sizeChartImg from "../assets/starboisizingchart.png";

import "../ProductPage.css";
import "../Collection.css";

// Map Firestore filenames -> local assets
const LOCAL_IMAGES = {
  "starboitee.png": starboiImg,
  "UNDEFINED-Tee.png": undefinedImg,
  "starboisizingchart.png": sizeChartImg,
};

export default function ProductPage() {
  const { id } = useParams(); // /product/:id
  const navigate = useNavigate();
  const { addToCart, cartItems = [] } = useContext(CartContext);

  const [cartOpen, setCartOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load single product from Firestore
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

        // images: array of filenames or single filename
        const rawImages = data.images ?? data.image ?? null;
        let imageKeys = [];
        if (Array.isArray(rawImages)) {
          imageKeys = rawImages;
        } else if (typeof rawImages === "string" && rawImages.trim() !== "") {
          imageKeys = [rawImages];
        }

        const resolvedImages = imageKeys
          .map((key) => LOCAL_IMAGES[key])
          .filter(Boolean);
        const finalImages =
          resolvedImages.length > 0 ? resolvedImages : [starboiImg];

        const sizes = Array.isArray(data.size)
          ? data.size
          : ["S", "M", "L", "XL", "XXL", "3XL"];

        // size chart filename field in Firestore: sizeChart
        const sizeChartKey = data.sizeChart || null;
        const sizeChart =
          sizeChartKey && LOCAL_IMAGES[sizeChartKey]
            ? LOCAL_IMAGES[sizeChartKey]
            : null;

        const productObj = {
          id: snap.id,
          name: data.name,
          price: data.price,
          description: data.description || "",
          category: (data.collection || "").toUpperCase(),
          sizes,
          images: finalImages,
          inStock: (data.stock ?? 0) > 0,
          stock: data.stock ?? 0,
          status: data.status || "",
          sizeChart,
        };

        setProduct(productObj);
        if (sizes.length > 0) setSelectedSize(sizes[0]);
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
    if (!product) return;
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart({
      ...product,
      size: selectedSize,
      quantity,
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold tracking-[0.1em] text-white">
            LOADING PRODUCT
          </h1>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold tracking-[0.1em] text-white">
            PRODUCT NOT FOUND
          </h1>
          <button
            onClick={() => navigate("/collection")}
            className="inline-block text-xs tracking-[0.15em] text-neutral-400 hover:text-white transition-colors underline"
          >
            BACK TO COLLECTION
          </button>
        </div>
      </main>
    );
  }

  const mainImage = product.images[activeImage] || product.images[0];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Cart sidebar */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* HEADER – Kasahara + Noir product header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-neutral-800">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: BACK */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] text-neutral-400 hover:text-white transition-colors"
            >
              ← BACK
            </button>

            {/* Center: PRODUCT */}
            <h1 className="text-sm md:text-lg font-bold tracking-[0.3em] text-white">
              PRODUCT
            </h1>

            {/* Right: spinning cart */}
            <button
              className="relative p-2 text-white hover:text-neutral-400 transition-colors"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <img
                src={CartIcon}
                alt="Cart"
                className="rotating-icon"
                style={{ width: "28px", height: "28px" }}
              />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer so content sits below fixed header */}
      <div className="h-16 md:h-20" />

      {/* MAIN CONTENT */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pb-20">
        {/* Top text block */}
        <section className="pt-8 pb-10 border-b border-neutral-800">
          <p className="text-xs tracking-[0.2em] text-neutral-500 mb-3">
            {product.category}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.1em] leading-tight mb-3">
            {product.name}
          </h2>
          <p className="text-lg md:text-xl tracking-[0.05em] mb-6">
            RM{product.price}
          </p>
          {product.description && (
            <p className="text-sm md:text-base text-neutral-400 max-w-xl">
              {product.description}
            </p>
          )}
        </section>

        {/* Image gallery: main image + thumbnails */}
        <section className="py-10">
          {/* Main image centered */}
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-md bg-neutral-900 overflow-hidden">
              <img
                src={mainImage}
                alt={product.name}
                className="product-main-image object-cover w-full h-auto"
              />
            </div>
          </div>

          {/* Thumbnails row (only if more than 1 image) */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {product.images.map((imgSrc, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`bg-neutral-900 overflow-hidden border-2 transition-colors ${
                    activeImage === index
                      ? "border-white"
                      : "border-transparent hover:border-neutral-600"
                  }`}
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <img
                    src={imgSrc}
                    alt={`${product.name} view ${index + 1}`}
                    className="thumbnail-img object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Size / Quantity / Add to Cart / Details / Size chart */}
        <section className="space-y-10">
          {/* Size */}
          {product.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-[0.15em] text-white">SIZE</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-xs tracking-[0.1em] border transition-all ${
                      selectedSize === size
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-neutral-400 border-neutral-700 hover:border-white hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-3">
            <p className="text-xs tracking-[0.15em] text-white">QUANTITY</p>
            <div className="flex items-center border border-neutral-700 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-neutral-400 hover:text-white transition-colors"
              >
                –
              </button>
              <span className="w-12 text-center text-sm text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-neutral-400 hover:text-white transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            disabled={!product.inStock || !selectedSize}
            onClick={handleAddToCart}
            className={`w-full md:w-80 py-4 text-xs tracking-[0.2em] transition-all ${
              product.inStock && selectedSize
                ? "bg-white text-black hover:bg-neutral-200"
                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            }`}
          >
            {!product.inStock
              ? "SOLD OUT"
              : !selectedSize
              ? "SELECT A SIZE"
              : "ADD TO CART"}
          </button>

          {/* Details */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <p className="text-xs tracking-[0.15em] text-white">DETAILS</p>
            <ul className="space-y-2">
              {product.status && (
                <li className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="text-white">—</span>
                  {product.status}
                </li>
              )}
              <li className="text-sm text-neutral-400 flex items-start gap-2">
                <span className="text-white">—</span>
                Stock: {product.stock}
              </li>
            </ul>
          </div>

          {/* Size chart from Firestore (centered) */}
          {product.sizeChart && (
            <div className="pt-6">
              <p className="text-xs tracking-[0.15em] text-white mb-3">
                SIZE CHART
              </p>
              <div className="flex justify-center">
                <img
                  src={product.sizeChart}
                  alt="Size chart"
                  className="w-full max-w-md border border-neutral-700 rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 md:py-12">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs tracking-[0.2em] text-neutral-500">
              © {new Date().getFullYear()} KASAHARA
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}