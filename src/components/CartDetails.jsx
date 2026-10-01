import React from 'react';
import './CartDetails.css';

const getPrice = (price) => Number(price.replace(/[^0-9.]/g, ''));
const formatPrice = (amount) => `$${amount.toFixed(2)}`;

const CartDetails = ({ items, isOpen, onClose, onAddMore, onChangeQuantity, onRemoveItem, onSelectProduct }) => {
	if (!isOpen) return null;

	const itemCount = items.reduce((total, item) => total + item.quantity, 0);
	const total = items.reduce((sum, item) => sum + getPrice(item.product.price) * item.quantity, 0);

	return (
		<div className="cart-overlay">
			<button className="cart-backdrop" aria-label="Close cart" onClick={onClose} />
			<aside className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
				<header className="cart-header">
					<button className="cart-close" aria-label="Close cart" onClick={onClose}>←</button>
					<h2 id="cart-title">Cart Items</h2>
					<button className="cart-add-more" onClick={onAddMore}>Add More Items</button>
				</header>

				{items.length === 0 ? (
					<div className="cart-empty">Your cart is empty.</div>
				) : (
					<div className="cart-item-list">
						{items.map(({ product, quantity }) => (
							<article className="cart-item" key={product.id}>
								<button
									className="cart-product-image"
									aria-label={`View ${product.title} details`}
									onClick={() => onSelectProduct(product)}
								>
									<img src={product.image} alt={product.title} />
								</button>
								<div className="cart-item-info">
									<h3>{product.title}</h3>
									<div className="cart-quantity-controls" aria-label={`Quantity for ${product.title}`}>
										<button aria-label={`Decrease ${product.title} quantity`} onClick={() => onChangeQuantity(product.id, -1)}>−</button>
										<span>{quantity}</span>
										<button aria-label={`Increase ${product.title} quantity`} onClick={() => onChangeQuantity(product.id, 1)}>+</button>
									</div>
								</div>
								<div className="cart-item-pricing">
									<strong>{formatPrice(getPrice(product.price) * quantity)}</strong>
									<span>{product.price} each</span>
									<button className="cart-remove" aria-label={`Remove ${product.title} from cart`} onClick={() => onRemoveItem(product.id)}>×</button>
								</div>
							</article>
						))}
					</div>
				)}

				<footer className="cart-summary">
					<div className="cart-total-row">
						<span>Selected Items ({itemCount})</span>
						<strong>Total: {formatPrice(total)}</strong>
					</div>
					<button className="cart-checkout" disabled={items.length === 0}>Check Out</button>
				</footer>
			</aside>
		</div>
	);
};

export default CartDetails;
