import React from 'react';

const BurgerHeader = ({ cartCount, onOpenCart }) => (
  <header className="navbar">
    <div className="logo">
      <img className="logo-icon" src="/logo_burger.png" alt="" />
      <div className="logo-text">
        <span className="brand-title">TASTY</span>
        <span className="brand-subtitle">BURGER</span>
      </div>
    </div>
    <nav className="nav-links" aria-label="Main navigation">
      <a href="#about">ABOUT</a>
      <a href="#menu" className="active">OUR MENU</a>
      <a href="#shop">SHOP</a>
      <a href="#contact">CONTACT</a>
      <button className="cart-button" aria-label={`Shopping bag with ${cartCount} items`} onClick={onOpenCart}>
        <span className="cart-bag-icon" aria-hidden="true" />
        <span className="cart-badge">{cartCount}</span>
      </button>
    </nav>
  </header>
);

export default BurgerHeader;