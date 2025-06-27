import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kasahara-logo.png';
import principles from '../assets/kasahara-principles.jpg'; // New image import

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
          line-height: 1.6;
        }

        .principles-image {
          margin-top: 2rem;
          width: 80%;
          max-width: 600px;
          height: auto;
          border-radius: 8px;
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
          Philosophy : To Connect, Collaborate, and Celebrate Creatives. <br /><br />
          Creativity is what keeps the mind young, drives innovation & inspires action. <br /><br />
          Therefore, that's what we're pushing for.
        </motion.p>

        <motion.img
          src={principles}
          alt="Kasahara Principles"
          className="principles-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />
      </motion.section>
    </div>
  );
}



