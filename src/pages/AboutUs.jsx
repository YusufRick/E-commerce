import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '<source />/assets/kasahara-logo.png'; // Make sure this matches your actual logo filename and path

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
          justify-content: center;
          padding: 4rem 2rem;
          background-color: white;
          color: black;
          text-align: center;
          font-family: 'TT Commons', sans-serif;
        }

        .back-btn {
          position: absolute;
          top: 2rem;
          left: 2rem;
          background: none;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          color: black;
        }

        .brand-logo {
          width: 140px;
          height: auto;
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: #333;
          max-width: 600px;
        }
      `}</style>

      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <img src={logo} alt="Brand Logo" style={{ width: '150px', border: '1px solid red' }} />

        <motion.p
          className="hero-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Connecting, Collaborating & Celebrating Creatives
        </motion.p>
      </motion.section>
    </div>
  );
}

