import React, { useState, useEffect } from 'react';
import Cart from '../components/Cart';
import Logo360 from '../components/Logo360';
import { motion } from 'framer-motion';

export default function HomePage({ go }) {
  const [cartOpen, setCartOpen] = useState(false);

  // Optional: restart audio on “Press Start” or when this component mounts
  useEffect(() => {
    const bg = document.getElementById('bg-audio');
    if (bg) bg.play().catch(() => {/* autoplay might be blocked until interaction */});
  }, []);

  return (
    <div className="home">
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <header className="header">
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          🛒
        </button>
      </header>

      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Logo360 />
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          KASAHARA
        </motion.h1>

        {/* Hidden background audio */}
        <audio
          id="bg-audio"
          src="/src/assets/your-audio-file.mp3"  // ← point to your audio here
          autoPlay
          loop
          style={{ display: 'none' }}
        />
      </motion.section>

      <nav className="main-nav">
        <button onClick={() => go('/fashion')}>Fashion Collection</button>
        <button onClick={() => go('/short-films')}>Short Films</button>
        <button onClick={() => go('/projects')}>Projects</button>
      </nav>
    </div>
  );
}
