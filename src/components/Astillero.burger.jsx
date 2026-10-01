import React, { useState } from 'react';
import './Astillero.burger.css';
import BurgerHeader from './BurgerHeader';
import BurgerMenu from './BurgerMenu';
import ProductModal from './ProductModal';
import CartDetails from './CartDetails';

const burgerData = [
  { id: 1, title: 'Steak Burger', desc: 'Ribeye steak, chilli sauce, tomatoes, pickles, lettuce', price: '$44.15', stars: 5, nutrition: { protein: 38, carbs: 42, fiber: 5, calories: 680 }, image: '/burger1.jpg' },
  { id: 2, title: 'Black Burger', desc: 'House patty, cheddar cheese, black bun, onion, purple sauce, lettuce', price: '$32.32', stars: 4, nutrition: { protein: 34, carbs: 48, fiber: 6, calories: 720 }, image: '/burger2.jpg' },
  { id: 3, title: 'Classic Burger', desc: 'American cheese, tomato relish, avocado, lettuce, red onion', price: '$26.15', stars: 3, nutrition: { protein: 29, carbs: 39, fiber: 8, calories: 610 }, image: '/burger3.jpg' },
  { id: 4, title: 'Cheesy Bacon Burger', desc: 'House patty, cheddar cheese, bacon, onion, mustard', price: '$30.25', stars: 4, nutrition: { protein: 36, carbs: 35, fiber: 4, calories: 750 }, image: '/burger4.jpg' },
  { id: 5, title: 'Cheese Melt Burger', desc: 'Grilled beef patty, melted cheese, lettuce, tomato, sesame bun', price: '$28.50', stars: 4, nutrition: { protein: 31, carbs: 40, fiber: 4, calories: 640 }, image: '/burger5.jpg', details: ['A juicy grilled beef patty is layered with melted cheese, crisp lettuce, and ripe tomato.', 'Served on a toasted sesame bun for a familiar, satisfying cheeseburger.'] },
  { id: 6, title: 'Sambal Fried Chicken Burger', desc: 'Crispy fried chicken, sambal mayo, lettuce, sesame bun', price: '$29.50', stars: 5, nutrition: { protein: 32, carbs: 46, fiber: 4, calories: 710 }, image: '/burger6.jpg', details: ['Golden fried chicken brings a crunchy bite with a tender center.', 'Sambal mayo adds a spicy, creamy kick, balanced with fresh lettuce on a sesame bun.'] },
  { id: 7, title: 'Masala Burger', desc: 'Spiced chicken patty, red onion, lettuce, toasted bun', price: '$27.75', stars: 2, nutrition: { protein: 30, carbs: 43, fiber: 5, calories: 675 }, image: '/burger7.jpg', details: ['A warmly spiced masala chicken patty is topped with crisp red onion and lettuce.', 'A toasted bun and creamy house sauce round out the fragrant, savory flavors.'] },
  { id: 8, title: 'Caprese Burger with Pesto and Mayo', desc: 'Beef patty, tomato, mozzarella, basil pesto mayo', price: '$31.25', stars: 5, nutrition: { protein: 33, carbs: 39, fiber: 4, calories: 690 }, image: '/burger8.jpg', details: ['A grilled beef patty is paired with tomato and creamy mozzarella.', 'Basil pesto mayo adds a fresh, herby finish, served in a glossy toasted bun.'] }
];

const AstilleroBurger = () => {
  const [selectedBurger, setSelectedBurger] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleWishlist = (event, burgerId) => {
    event.stopPropagation();
    setWishlist(prev => ({ ...prev, [burgerId]: !prev[burgerId] }));
  };

  const addToCart = (product, quantity) => {
    setCartItems(current => {
      const existingItem = current.find(item => item.product.id === product.id);
      if (existingItem) {
        return current.map(item => item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item);
      }
      return [...current, { product, quantity }];
    });
  };

  const changeCartQuantity = (productId, amount) => {
    setCartItems(current => current.map(item => item.product.id === productId
      ? { ...item, quantity: Math.max(1, item.quantity + amount) }
      : item));
  };

  const removeCartItem = (productId) => {
    setCartItems(current => current.filter(item => item.product.id !== productId));
  };

  const openProductFromCart = (product) => {
    setIsCartOpen(false);
    setSelectedBurger(product);
  };

  const browseMenuFromCart = () => {
    setIsCartOpen(false);
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="tasty-burger-app">
      <BurgerHeader cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      <BurgerMenu
        burgers={burgerData}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        onSelectBurger={setSelectedBurger}
      />
      <ProductModal
        burger={selectedBurger}
        cartCount={cartCount}
        onAddToCart={addToCart}
        onClose={() => setSelectedBurger(null)}
      />
      <CartDetails
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onAddMore={browseMenuFromCart}
        onChangeQuantity={changeCartQuantity}
        onRemoveItem={removeCartItem}
        onSelectProduct={openProductFromCart}
      />
    </div>
  );
};

export default AstilleroBurger;
