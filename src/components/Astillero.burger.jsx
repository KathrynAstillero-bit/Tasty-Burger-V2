import React, { useState } from 'react';
import './Astillero.burger.css';

const burgerData = [
  {
    id: 1,
    title: 'Steak Burger',
    desc: 'Ribeye Steak, chilli sauce, tomatoes, pickles, lettuce',
    price: '$ 44.15',
    stars: 5,
    hasHalf: false,
    image: '/burger1.jpg'
  },
  {
    id: 2,
    title: 'Black Burger',
    desc: 'House patty, cheddar cheese, black bun, onion, purple sauce, lettuce, tomatoes',
    price: '$ 32.32',
    stars: 4,
    hasHalf: true,
    image: '/burger2.jpg'
  },
  {
    id: 3,
    title: 'Classic Burger',
    desc: 'American cheese, tomato relish, avocado, lettuce, red onion',
    price: '$ 26.15',
    stars: 3,
    hasHalf: false,
    image: '/burger3.jpg'
  },
  {
    id: 4,
    title: 'Cheesy Bacon Burger',
    desc: 'House patty, cheddar cheese, bacon, onion, mustard',
    price: '$ 30.25',
    stars: 4,
    hasHalf: true,
    image: '/burger4.jpg'
  }
];

const AstilleroBurger = () => {
  const [cartCount, setCartCount] = useState(3);
  const [wishlist, setWishlist] = useState({});

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderStars = (fullStars, hasHalf) => {
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starIcons.push(<i key={i} className="fa-solid fa-star"></i>);
      } else if (i === fullStars && hasHalf) {
        starIcons.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
      } else {
        starIcons.push(<i key={i} className="fa-regular fa-star"></i>);
      }
    }
    return starIcons;
  };

  return (
    <div className="tasty-burger-app">
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">🍔</span>
          <div className="logo-text">
            <span className="brand-title">TASTY</span>
            <span className="brand-subtitle">BURGER</span>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#menu" className="active">OUR MENU</a>
          <a href="#shop">SHOP</a>
          <a href="#contact">CONTACT</a>
          <div className="cart-icon">
            <i className="fa-solid fa-bag-shopping"></i>
            <span className="cart-badge">{cartCount}</span>
          </div>
        </nav>
      </header>

      <main className="container">
        <section className="hero-section">
          <h1 className="main-title">OUR CRAZY BURGERS</h1>
          <p className="subtitle">
            Buckle up for a flavor explosion! Stacked high with sizzled patties, molten cheese, and wild toppings—your ultimate burger craving ends here.
          </p>
        </section>

        <section className="burger-grid">
          {burgerData.map((burger) => (
            <article key={burger.id} className="burger-card">
              <div className="card-image">
                <img src={burger.image} alt={burger.title} />
              </div>
              <div className="card-body">
                <div className="card-header-row">
                  <div className="stars">
                    {renderStars(burger.stars, burger.hasHalf)}
                  </div>
                  <button 
                    className={`wishlist-btn ${wishlist[burger.id] ? 'active' : ''}`}
                    onClick={() => toggleWishlist(burger.id)}
                    aria-label="Add to wishlist"
                  >
                    <i className={wishlist[burger.id] ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                  </button>
                </div>
                <h3 className="burger-title">{burger.title}</h3>
                <p className="burger-desc">{burger.desc}</p>
                <button className="price-tag" onClick={handleAddToCart}>
                  {burger.price}
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default AstilleroBurger;
