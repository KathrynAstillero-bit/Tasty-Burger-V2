import React, { useEffect, useRef, useState } from 'react';
import WishlistButton from './WishlistButton';
import HeroBurgerSlider from './Slider';

const BurgerCard = ({ burger, cardRef, isWishlisted, isHighlighted, onToggleWishlist, onSelectBurger }) => (
  <article
    className={`burger-card ${burger.id === 4 ? 'cheesy-bacon-card' : ''} ${burger.id === 6 || burger.id === 8 ? 'compact-copy-card' : ''}`}
    ref={cardRef}
    data-highlighted={isHighlighted || undefined}
    role="button"
    tabIndex="0"
    onClick={() => onSelectBurger(burger)}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelectBurger(burger);
      }
    }}
  >
    <span className="card-image">
      <img src={burger.image} alt={burger.title} />
    </span>
    <span className="card-body">
      <span className="card-header-row">
        <span className="stars" aria-label={`${burger.stars} out of 5 stars`}>
          {'★'.repeat(burger.stars)}
          <span className="empty-stars">{'★'.repeat(5 - burger.stars)}</span>
        </span>
        <span className="wishlist-heart-wrap">
          <WishlistButton
            burgerTitle={burger.title}
            selected={isWishlisted}
            onToggle={(event) => onToggleWishlist(event, burger.id)}
          />
        </span>
      </span>
      <span className="burger-title">{burger.title}</span>
      <span className="burger-desc">{burger.desc}</span>
      <span className="card-footer">
        <span className="card-price">{burger.price}</span>
        <span className="view-details-wrap" aria-label={`View details for ${burger.title}`}>
          <span className="view-product" aria-hidden="true">→</span>
        </span>
      </span>
    </span>
  </article>
);

const BurgerMenu = ({ burgers, wishlist, onToggleWishlist, onSelectBurger }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightedBurger, setHighlightedBurger] = useState(null);
  const cardRefs = useRef({});
  const highlightTimeout = useRef(null);

  useEffect(() => () => window.clearTimeout(highlightTimeout.current), []);

  const findBurger = (burgerId) => {
    const card = cardRefs.current[burgerId];
    if (!card) return;

    setHighlightedBurger(burgerId);
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.clearTimeout(highlightTimeout.current);
    highlightTimeout.current = window.setTimeout(() => setHighlightedBurger(null), 1500);
  };

  return (
    <main className="menu-container">
      <HeroBurgerSlider
        burgers={burgers}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        onFindBurger={findBurger}
      />

      <section className="hero-section" id="menu">
        <h2 className="main-title">OUR CRAZY BURGERS</h2>
        <p className="subtitle">Stacked high with sizzled patties, molten cheese, and wild toppings.</p>
      </section>

      <section className="burger-grid" aria-label="Burger menu">
        {burgers.map((burger) => (
          <BurgerCard
            key={burger.id}
            burger={burger}
            cardRef={(element) => { cardRefs.current[burger.id] = element; }}
            isWishlisted={Boolean(wishlist[burger.id])}
            isHighlighted={highlightedBurger === burger.id}
            onToggleWishlist={onToggleWishlist}
            onSelectBurger={onSelectBurger}
          />
        ))}
      </section>
    </main>
  );
};

export default BurgerMenu;