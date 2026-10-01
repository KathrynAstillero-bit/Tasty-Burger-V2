import React, { useState } from 'react';

const HeroBurgerSlider = ({ burgers, activeIndex, onChange, onFindBurger }) => {
	const [slideDirection, setSlideDirection] = useState('next');
	const burger = burgers[activeIndex];

	const changeSlide = (direction) => {
		setSlideDirection(direction > 0 ? 'next' : 'previous');
		onChange((activeIndex + direction + burgers.length) % burgers.length);
	};

	const selectSlide = (index) => {
		if (index !== activeIndex) {
			setSlideDirection(index > activeIndex ? 'next' : 'previous');
			onChange(index);
		}
	};

	return (
		<section className="featured-slider" data-slide-direction={slideDirection} aria-label="Burger highlights">
			<div className="featured-panel" key={burger.id}>
				<div className="featured-image-wrap">
					<button
						className="featured-image-button"
						onClick={() => onFindBurger(burger.id)}
						aria-label={`Find ${burger.title} in the menu`}
					>
						<img className={`featured-image featured-image-${burger.id}`} src={burger.image} alt={burger.title} />
					</button>
					<button className="featured-arrow featured-arrow-prev" onClick={() => changeSlide(-1)} aria-label="Previous burger">‹‹</button>
					<span className="featured-index">{String(activeIndex + 1).padStart(2, '0')} / {String(burgers.length).padStart(2, '0')}</span>
				</div>
				<button className="featured-arrow featured-arrow-next" onClick={() => changeSlide(1)} aria-label="Next burger">››</button>
				<div className="featured-copy">
					<span className="featured-eyebrow">ON THE MENU</span>
					<h1>{burger.title}</h1>
					<p>{burger.desc}</p>
					<strong className="featured-price">{burger.price}</strong>
					<div className="featured-pagination" aria-label="Choose a featured burger">
						{burgers.map((item, index) => (
							<button
								key={item.id}
								className={`featured-dot ${index === activeIndex ? 'active' : ''}`}
								onClick={() => selectSlide(index)}
								aria-label={`Show ${item.title}`}
								aria-current={index === activeIndex ? 'true' : undefined}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroBurgerSlider;
