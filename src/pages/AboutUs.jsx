import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/kasahara-logo.png'
import principles from '../assets/kasahara-principles.jpg'
import '../index.css'
import tiktok from '../assets/tiktok2.png'
import instagram from '../assets/instagram2.png'

export default function AboutUs() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white font-['TT_Commons'] relative px-8 py-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 text-sm opacity-80 hover:opacity-100 transition"
      >
        ← Back
      </button>

      {/* Content */}
      <motion.section
        className="flex flex-col items-center text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >

        {/* Logo */}
        <img
          src={logo}
          alt="Brand Logo"
          className="w-[60vw] max-w-[640px] h-auto"
        />

        {/* Description */}
        <motion.p
          className="text-gray-400 text-[1.1rem] max-w-[600px] leading-relaxed mt-4 px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Philosophy : To Connect, Collaborate, and Celebrate Creatives. <br /><br />
          Creativity is what keeps the mind young, drives innovation & inspires action. <br /><br />
          Therefore, that's what we're pushing for.
        </motion.p>

        {/* Image */}
        <motion.img
          src={principles}
          alt="Kasahara Principles"
          className="mt-8 w-[80%] max-w-[600px] rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />

      </motion.section>

      {/* Footer */}
      <footer className="w-full mt-auto pt-10 flex flex-col items-center">

        {/* Divider */}
        <div className="w-24 h-[1px] bg-white/20 mb-6" />

        {/* Social Icons */}
        <div className="flex gap-10">

          {/* Instagram */}
          <a
            href="https://instagram.com/kasahara.co"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group transition"
          >
            <img
              src={instagram}
              alt="Instagram"
              className="w-7 h-7 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition duration-200"
            />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@kasahara.co"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="group transition"
          >
            <img
              src={tiktok}
              alt="TikTok"
              className="w-7 h-7 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition duration-200"
            />
          </a>

        </div>

        {/* Footer Text */}
        <p className="mt-6 text-[0.7rem] tracking-widest text-white/30 uppercase">
          © Kasahara
        </p>

      </footer>

    </div>
  )
}
