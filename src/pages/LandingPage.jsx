// src/pages/LandingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LandingPage({ go }) {
  const navigate = useNavigate();
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
        onClick={() => navigate('/homePage')}
      >
         Start
      </button>
    </div>
  );
}
