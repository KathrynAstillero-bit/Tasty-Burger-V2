import React, { useState } from 'react';
import './description.css';

const Description = ({ product = { title: 'Steak Burger', price: '$44.15', image: '/burger1.jpg' }, cartCount = 0, onAddToCart }) => {
	const [quantity, setQuantity] = useState(1);
	const [quantityDirection, setQuantityDirection] = useState('up');
	const starCount = product.stars ?? 5;
	const nutrition = product.nutrition ?? { protein: 38, carbs: 42, fiber: 5, calories: 680 };

	const changeQuantity = (amount) => {
		setQuantityDirection(amount > 0 ? 'up' : 'down');
		setQuantity(current => Math.max(1, current + amount));
	};

	const handleAddToCart = () => {
		onAddToCart?.(product, quantity);
	};

	return (
		<div className="product-page-shell">
			<main className="product-card">
				<section className="product-visual" aria-label="Product image">
					<div className="image-frame">
						<img src={product.image} alt={product.title} />
					</div>
				</section>

				<section className="product-information">
					<div className="product-heading">
						<h1>{product.title}</h1>
					</div>

					<div className="rating" aria-label={`Rated ${starCount} out of 5`}>
						<span className="rating-stars">
							{'★'.repeat(starCount)}
							<span className="rating-empty-stars">{'★'.repeat(5 - starCount)}</span>
						</span>
						<span>{starCount} out of 5</span>
					</div>

					<div className="product-tabs" aria-label="Product information">
						<span className="active">Description</span>
						<p className="price">{product.price} <sup>USD</sup></p>
					</div>

					<div className="description">
						<p className="detail-meta">PROTEIN {nutrition.protein}G &nbsp;·&nbsp; CARBS {nutrition.carbs}G &nbsp;·&nbsp; FIBER {nutrition.fiber}G &nbsp;·&nbsp; {nutrition.calories} CALORIES</p>
						{(product.details ?? [
							'Our signature steak burger brings together a charred ribeye patty, melted aged cheddar, and a bright house sauce on a toasted sesame bun.',
							'Finished with crisp lettuce, ripe tomato, and pickles for a balanced bite. Every order is prepared fresh and wrapped with care.'
						]).map((detail) => <p key={detail}>{detail}</p>)}
					</div>

					<div className="purchase-area">
						<div className="quantity-stepper" aria-label="Choose quantity">
							<button
								className="quantity-button"
								aria-label="Decrease quantity"
								disabled={quantity === 1}
								onClick={() => changeQuantity(-1)}
							>
								−
							</button>
							<span className="quantity-value" aria-live="polite" aria-atomic="true">
								<span key={quantity} className={`quantity-number roll-${quantityDirection}`}>
									{quantity}
								</span>
							</span>
							<button
								className="quantity-button"
								aria-label="Increase quantity"
								onClick={() => changeQuantity(1)}
							>
								+
							</button>
						</div>
						<button className="add-to-cart" onClick={handleAddToCart}>
							Add to cart <span>{cartCount > 0 ? `(${cartCount})` : ''}</span>
						</button>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Description;
