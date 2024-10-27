import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeFromCart, updateQuantity } from '../../store/features/cart/cartSlice';
import { Button } from '../../components/common/Button/Button';
import styles from './CartPage.module.css';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector(state => state.cart);

  const handleQuantityChange = (gameId: number, quantity: number) => {
    if (quantity < 1) {
      dispatch(removeFromCart(gameId));
    } else {
      dispatch(updateQuantity({ gameId, quantity }));
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any games yet.</p>
        <Button 
          variant="primary"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1>Shopping Cart</h1>
      
      <div className={styles.content}>
        <div className={styles.items}>
          {items.map(({ game, quantity }) => {
            const discount = game.rating > 4 ? 20 : game.rating > 3 ? 10 : 0;
            const finalPrice = game.price * (1 - discount / 100);
            
            return (
              <div key={game.id} className={styles.cartItem}>
                <img 
                  src={game.background_image} 
                  alt={game.name}
                  className={styles.gameImage} 
                />
                
                <div className={styles.gameInfo}>
                  <h3>{game.name}</h3>
                  
                  <div className={styles.priceInfo}>
                    {discount > 0 && (
                      <span className={styles.originalPrice}>
                        ${game.price.toFixed(2)}
                      </span>
                    )}
                    <span className={styles.price}>
                      ${finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className={styles.quantity}>
                  <button 
                    onClick={() => handleQuantityChange(game.id, quantity - 1)}
                    className={styles.quantityButton}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(game.id, quantity + 1)}
                    className={styles.quantityButton}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className={styles.totalPrice}>
                  ${(finalPrice * quantity).toFixed(2)}
                </div>

                <button 
                  onClick={() => dispatch(removeFromCart(game.id))}
                  className={styles.removeButton}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        <div className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryDetails}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button 
            variant="primary" 
            className={styles.checkoutButton}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
          <Button 
            variant="outline"
            className={styles.continueButton}
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};