import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kasahara-logo.png'; // Ensure this path is correct

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <style>{`
        .about-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          background-color: black;
          color: white;
          font-family: 'TT Commons', sans-serif;
          position: relative;
        }

        .back-btn {
          position: absolute;
          top: 2rem;
          left: 2rem;
          background: none;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          color: white;
        }

        .brand-logo {
          width: 640px;
          height: auto;
          margin-top: 2rem;
        }

        .brand-description {
          font-size: 1.1rem;
          color: #ccc;
          margin-top: 1rem;
          max-width: 600px;
          text-align: center;
        }
      `}</style>

      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <img src={logo} alt="Brand Logo" className="brand-logo" />

        <motion.p
          className="brand-description"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Kasahara is a platform that connects, collaborates, and celebrates the creative community — empowering artists and visionaries through shared experience and inspiration.
        </motion.p>
      </motion.section>
    </div>
  );
}


