import React from 'react';
import Description from './description';

const ProductModal = ({ burger, cartCount, onAddToCart, onClose }) => {
  if (!burger) return null;

  return (
    <div className="product-modal" role="dialog" aria-modal="true" aria-label={`${burger.title} details`}>
      <div className="modal-backdrop" aria-hidden="true" onClick={onClose} />
      <div className="modal-content">
        <button className="modal-close" aria-label="Close product details" onClick={onClose}>×</button>
        <Description product={burger} cartCount={cartCount} onAddToCart={onAddToCart} />
      </div>
    </div>
  );
};

export default ProductModal;