import { useState } from "react"
import { HashRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import FilmGrain from "./components/effects/FilmGrain"
import FlickerOverlay from "./components/effects/FlickerOverlay"

import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Shorts from "./pages/Shorts"
import Shop from "./pages/Shop"
import Contact from "./pages/Contact"

import "./App.css"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    const next = !isMenuOpen
    setIsMenuOpen(next)
    document.body.style.overflow = next ? "hidden" : "auto"
  }

  return (
    <HashRouter>
      <div className="app-wrapper">
        <FilmGrain />
        <FlickerOverlay />

        <Header onMenuToggle={toggleMenu} />
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </HashRouter>
  )
}

export default App