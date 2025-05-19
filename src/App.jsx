"use client"

import { useState } from "react"
import Header from "./components/Header"
import Menu from "./components/Menu"
import Hero from "./components/Hero"
import Marquee from "./components/Marquee"
import FeaturedProjects from "./components/FeaturedProjects"
import Footer from "./components/Footer"
import FilmGrain from "./components/effects/FilmGrain"
import FlickerOverlay from "./components/effects/FlickerOverlay"
import "./App.css"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden"
  }

  return (
    <>
      <FilmGrain />
      <FlickerOverlay />
      <div className="container">
        <Header onMenuToggle={toggleMenu} />
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
        <Hero />
        <Marquee />
        <FeaturedProjects />
        <Footer />
      </div>
    </>
  )
}

export default App
