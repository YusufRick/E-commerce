"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/components/Menu.css"

function Menu({ isOpen, onClose }) {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={`menu ${isOpen ? "active" : ""}`}>
      <button className="menu-close" aria-label="Close menu" onClick={onClose}>
        X
      </button>
      <nav className="menu-nav">
        <ul>
          <li>
            <Link to="/" onClick={onClose}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={onClose}>
              PROJECTS
            </Link>
          </li>
          <li>
            <Link to="/shorts" onClick={onClose}>
              SHORTS
            </Link>
          </li>
          <li>
            <Link to="/collection" onClick={onClose}>
              COLLECTION
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={onClose}>
              SHOP
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={onClose}>
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Menu
