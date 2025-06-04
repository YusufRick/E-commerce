// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Navigation Links */}
        <div className="footer-links">
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/fashion" className="footer-link">
            Fashion Collection
          </Link>
          <Link to="/short-films" className="footer-link">
            Short Films
          </Link>
          <Link to="/projects" className="footer-link">
            Projects
          </Link>
        </div>

        {/* Optional: Social icons or contact could go here */}
        {/* <div className="footer-socials">
          <a href="https://twitter.com/yourhandle" target="_blank" rel="noreferrer">
            Twitter
          </a>
          <a href="https://instagram.com/yourhandle" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div> */}

        {/* Copyright */}
        <div className="footer-copy">
          © {new Date().getFullYear()} Kasahara. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
