import React from 'react';
import { motion } from 'framer-motion';
import StartIcon from '../assets/start.png';

export default function LandingPage({ go }) {
  return (
    <div className="landing">
      <motion.h1
        className="site-title"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        KASAHARA
      </motion.h1>
      <button
        className="start-btn"
        onClick={() => go('/HomePage')}
                
        >
        <img src={StartIcon} alt="Start" className="start-icon" />
      </button>
    </div>
  );
}