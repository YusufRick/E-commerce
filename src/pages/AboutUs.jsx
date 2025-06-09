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
          Kasahara is a concept-first clothing label built on contrast. Every piece started with a question
          , not a trend. Its a story, not just fashion, often mixing opposing elements. Softness and sharp edges
            or structure and emotion. As for the rest, we leave it for you to interpret. We make collection 
            for people who find meaning in details. Look closer.
        </motion.p>
      </motion.section>

      <motion.section
        className="content-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h2 className="section-title">Our Mission</h2>
        <p className="section-text">
          Telling stories and express creativity. Creating instead of consuming. We don't follow the market, We follow the message
        </p>

        <h2 className="section-title">The Collective</h2>
        <ul className="team-list">
          <li>Director: </li>
          <li>Creative Director: </li>
          <li>Visual Artist: </li>
          <li>Production:</li>
          <li>Inspired by: GOD</li>
        </ul>
      </motion.section>
    </div>
  );
}
