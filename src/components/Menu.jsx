"use client"

function Menu({ isOpen, onClose }) {
  return (
    <div className={`menu ${isOpen ? "active" : ""}`}>
      <button className="menu-close" aria-label="Close menu" onClick={onClose}>
        X
      </button>
      <ul>
        <li><Link to="/"        onClick={onClose}>HOME</Link></li>
        <li><Link to="/projects" onClick={onClose}>PROJECTS</Link></li>
        <li><Link to="/shorts"   onClick={onClose}>SHORTS</Link></li>
        <li><Link to="/shop"     onClick={onClose}>SHOP</Link></li>
        <li><Link to="/contact"  onClick={onClose}>CONTACT</Link></li>
      </ul>
    </div>
  )
}

export default Menu
