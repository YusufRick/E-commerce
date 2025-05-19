"use client"

function Menu({ isOpen, onClose }) {
  return (
    <div className={`menu ${isOpen ? "active" : ""}`}>
      <button className="menu-close" aria-label="Close menu" onClick={onClose}>
        X
      </button>
      <ul>
        <li>
          <a href="index.html">HOME</a>
        </li>
        <li>
          <a href="#">PROJECTS</a>
        </li>
        <li>
          <a href="#">SHORTS</a>
        </li>
        <li>
          <a href="#">COLLECTION</a>
        </li>
        <li>
          <a href="#">SHOP</a>
        </li>
        <li>
          <a href="#">CONTACT</a>
        </li>
      </ul>
    </div>
  )
}

export default Menu
