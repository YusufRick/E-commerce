import React, { useState, useEffect, useRef } from 'react';
import Cart from '../components/Cart';
import { motion } from 'framer-motion';
import TitleLogo from '../assets/KasaharaStarboi.png';
import CartIcon from '../assets/cart_icon.png';
import ShirtIcon from '../assets/redshirtrbg.png';
import ShortFilmsIcon from '../assets/cam2.png';
import CanIcon from '../assets/camredrbg.png';
import Media from '../assets/media-icon.png';
import bgAudioFile from '../assets/muaysite.wav';
import '../Homepage.css';

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
        <motion.img
          src={TitleLogo}
          alt="KASAHARA Logo"
          className="home-title"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

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

        <div className="nav-item contact" onClick={() => go('/About')}>
          <img src={Media} alt="Contact" className="nav-icon" />
          <div className="overlay">About</div>
        </div>

        <div className="nav-item visuals" onClick={() => go('/visual')}>
          <img src={CanIcon} alt="Visuals" className="nav-icon" />
          <div className="overlay">Highlights</div>
        </div>
      </div>

      <motion.h4
        className="footer"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        © Kasahara. All rights reserved.
      </motion.h4>
    </div>
  );
}
