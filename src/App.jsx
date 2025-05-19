// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Menu   from './components/Menu';
import FilmGrain      from './components/effects/FilmGrain';
import FlickerOverlay from './components/effects/FlickerOverlay';

import Projects from './pages/Projects';
import Shorts   from './pages/Shorts';
import Shop     from './pages/Shop';
import Contact  from './pages/Contact';

import Hero             from './components/Hero';
import Marquee          from './components/Marquee';
import FeaturedProjects from './components/FeaturedProjects';
import Footer           from './components/Footer';

import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const next = !isMenuOpen;
    setIsMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : 'auto';
  };

  return (
    <BrowserRouter>
      <FilmGrain />
      <FlickerOverlay />

      <Header onMenuToggle={toggleMenu} />
      <Menu isOpen={isMenuOpen} onClose={toggleMenu} />

      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Marquee />
                <FeaturedProjects />
                <Footer />
              </>
            }
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/shorts"   element={<Shorts />} />
          <Route path="/shop"     element={<Shop />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="*"         element={<h2>Page not found</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
