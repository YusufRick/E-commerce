function Menu({ isOpen, onClose }) {
  return (
    <div className={`menu ${isOpen ? "active" : ""}`}>
      <button className="menu-close" aria-label="Close menu" onClick={onClose}>
        X
      </button>
      <ul>
        <li>
          <a href="#/">HOME</a>
        </li>
        <li>
          <a href="#/projects">PROJECTS</a>
        </li>
        <li>
          <a href="#/shorts">SHORTS</a>
        </li>
        <li>
          <a href="#/shop">SHOP</a>
        </li>
        <li>
          <a href="#/contact">CONTACT</a>
        </li>
      </ul>
    </div>
  )
}

export default Menu