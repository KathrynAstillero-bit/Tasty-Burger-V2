import React from 'react';

const WishlistButton = ({ burgerTitle, selected, onToggle }) => (
  <button
    className={`wishlist-button ${selected ? 'selected' : ''}`}
    aria-label={selected ? `Remove ${burgerTitle} from wishlist` : `Add ${burgerTitle} to wishlist`}
    aria-pressed={selected}
    onClick={onToggle}
  >
    {selected ? '♥' : '♡'}
  </button>
);

export default WishlistButton;