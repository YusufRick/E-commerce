import React from 'react';
import { motion } from 'framer-motion';
import StartIcon from '../assets/enter.png';
import TitleLogo from '../assets/kasahara-logo.png'; 

export default function LandingPage({ go }) {
  const handleStart = () => {
    go('/HomePage');
  };

  return (
    <div className="landing">
      <motion.img
        src={TitleLogo}
        alt="KASAHARA Logo"
        className="site-title"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />

      <button className="start-btn" onClick={handleStart}>
        <img src={StartIcon} alt="Start" className="start-icon" />
      </button>
    </div>
  );
}
