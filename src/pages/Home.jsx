// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import Cart from '../components/Cart';
import { motion } from 'framer-motion';

import CartIcon from '../assets/cart_icon.png';
import ShirtIcon from '../assets/shirt-icon.png';
import ShortFilmsIcon from '../assets/cam2.png';
import CanIcon from '../assets/camera-icon.png';

// 1️⃣ Import so the bundler resolves the path
import bgAudioFile from '../assets/CHRYSALIS_WEBSITE.mp3';

export default function HomePage({ go }) {
  const [cartOpen, setCartOpen] = useState(false);
  const audioRef = useRef(null);


  return (
    <div className="home">
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

      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <motion.h1
          className="site-title"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          kasahara
        </motion.h1>

        {/* hidden audio element */}
        <audio
          ref={audioRef}
          src={bgAudioFile}
          autoPlay
          loop
          muted
          style={{ display: 'none' }}
        />
      </motion.section>

      <div className="main-nav">
        <div className="nav-item fashion" onClick={() => go('/fashion')}>
          <img src={ShirtIcon} alt="Fashion" className="nav-icon" />
          <div className="overlay">Collection</div>
        </div>

        <div className="nav-item short-films" onClick={() => go('/contact')}>
          <img src={ShortFilmsIcon} alt="Contact" className="nav-icon" />
          <div className="overlay">Contact</div>
        </div>

        <div className="nav-item projects" onClick={() => go('/visual')}>
          <img src={CanIcon} alt="Visuals" className="nav-icon" />
          <div className="overlay">Visuals</div>
        </div>
      </div>

      <div>
        
        <motion.h4
          className="footer"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          @Kasahara all reserved Copyrights 
        </motion.h4>
      </div>
      
    </div>

    
  );
}
