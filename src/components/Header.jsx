// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import BurgerMenu from './BurgerMenu';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <Link to="/">E-Store</Link>
        </div>
        <div className="desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/cart">Cart</Link>
          <ThemeToggle />
        </div>
        <div className="mobile-menu">
          <BurgerMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;