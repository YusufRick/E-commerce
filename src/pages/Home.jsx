import React, { useState, useEffect } from 'react';
import Cart from '../components/Cart';
import Logo360 from '../components/Logo360';
import { motion } from 'framer-motion';

import CartIcon from '../assets/cart_icon.png';
import ShirtIcon from '../assets/shirt-icon.png';
import ShortFilmsIcon from '../assets/cam2.png';
import CanIcon from '../assets/can.icon.png';
import Footer from './Footer';
export default function HomePage({ go }) {
  const [cartOpen, setCartOpen] = useState(false);

  // Attempt autoplay on mount
  useEffect(() => {
    const bg = document.getElementById('bg-audio');
    if (bg) bg.play().catch(() => {});
  }, []);

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

        {/* Hidden background audio */}
        <audio
          id="bg-audio"
          src="/src/assets/CHRYSALIS_WEBSITE.wav"//audio put here
          autoPlay
          loop
          style={{ display: 'none' }}
        />
      </motion.section>

      {/* Card-style nav */}
      <div className="main-nav">
        <div className="nav-item fashion" onClick={() => go('/fashion')}>
          <img src={ShirtIcon} alt="" className="nav-icon" />
          <div className="overlay">Fashion Collection</div>
        </div>

        <div className="nav-item short-films" onClick={() => go('/short-films')}>
          <img src={ShortFilmsIcon} alt="" className="nav-icon" />
          <div className="overlay">Short Films</div>
        </div>

        <div className="nav-item projects" onClick={() => go('/projects')}>
          <img src={CanIcon} alt="" className="nav-icon" />
          <div className="overlay">Projects</div>
        </div>
        
      </div>   
    </div>
  );
}
