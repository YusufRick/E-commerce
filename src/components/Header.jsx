"use client"

function Header({ onMenuToggle }) {
  return (
    <header>
      <button className="menu-toggle" aria-label="Open menu" onClick={onMenuToggle}>
        MENU
      </button>
    </header>
  )
}

export default Header
