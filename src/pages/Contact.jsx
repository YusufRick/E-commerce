import React from 'react';
import { FaInstagram, FaTiktok, FaEnvelope } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';


export default function Contact() {

  const navigate = useNavigate();
  return (
    <div className="contact-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h1 className="contact-title">Contact</h1>
      <div className="links-container">
        <a
          href="mailto:info@kasahara.com"
          className="contact-link"
          aria-label="Email"
        >
          <FaEnvelope size={50} />
        </a>
        <a
          href="https://www.instagram.com/kasahara.co"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
          aria-label="Instagram"
        >
          <FaInstagram size={50} />
        </a>
        <a
          href="https://www.tiktok.com/@kasahara.co"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
          aria-label="TikTok"
        >
          <FaTiktok size={50} />
        </a>
      </div>
    </div>
  );
}
