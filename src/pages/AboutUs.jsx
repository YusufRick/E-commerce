import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';


export default function AboutUs() {
    const navigate = useNavigate();
  return (
    <div className="about-page">
    <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1
          className="hero-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          ABOUT US
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Connecting, Collaborating & Celebrating & Creatives 
        </motion.p>
      </motion.section>
    </div>
  );
}
