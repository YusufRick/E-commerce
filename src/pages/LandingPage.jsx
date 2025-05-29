import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage({ go }) {
  return (
    <div className="landing">
      <motion.img
  src={logo}
  alt="Site Logo"
  className="site-logo"
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.5, duration: 0.8 }}
/> 


      <button
        className="start-btn"
        onClick={() => go('/HomePage')}
      >
        Press Start
      </button>
    </div>
  );
}
