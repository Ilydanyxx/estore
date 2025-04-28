// src/components/BurgerMenu.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="burger-container">
      <button className="burger-button" onClick={toggleMenu}>
        ☰
      </button>
      {open && (
        <div className="burger-dropdown">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/catalog" onClick={() => setOpen(false)}>Catalog</Link>
          <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;