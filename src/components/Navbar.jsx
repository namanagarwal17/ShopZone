import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="nav-container">
        {/* Brand Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">Shop<span className="logo-highlight">Zone</span></span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navigation Links */}
        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMenu}
          >
            Shop
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMenu}
          >
            Contact
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? 'nav-link cart-link active' : 'nav-link cart-link'
            }
            onClick={closeMenu}
          >
            <span className="cart-link-content">
              <span className="cart-icon">🛒</span>
              <span>Cart</span>
              <span className="cart-badge" aria-label={`${totalItems} items in cart`}>
                {totalItems}
              </span>
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
