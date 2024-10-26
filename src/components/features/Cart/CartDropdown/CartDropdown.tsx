import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import { toggleCart, removeFromCart, updateQuantity } from '../../../../store/features/cart/cartSlice';
import styles from './CartDropdown.module.css';

export const CartDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total, isOpen } = useAppSelector(state => state.cart);

  const handleQuantityChange = (gameId: number, quantity: number) => {
    if (quantity < 1) {
      dispatch(removeFromCart(gameId));
    } else {
      dispatch(updateQuantity({ gameId, quantity }));
    }
  };

  const handleCheckout = () => {
    dispatch(toggleCart());
    navigate('/cart');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.dropdown}>
      <div className={styles.header}>
        <h3>Your Cart ({items.length})</h3>
        <button 
          className={styles.closeButton}
          onClick={() => dispatch(toggleCart())}
        >
          ×
        </button>
      </div>
      
      <div className={styles.items}>
        {items.length === 0 ? (
          <p className={styles.emptyCart}>Your cart is empty</p>
        ) : (
          items.map(({ game, quantity }) => (
            <div key={game.id} className={styles.item}>
              <img 
                src={game.background_image} 
                alt={game.name}
                className={styles.gameImage} 
              />
              <div className={styles.itemInfo}>
                <h4>{game.name}</h4>
                <div className={styles.itemActions}>
                  <div className={styles.quantity}>
                    <button 
                      onClick={() => handleQuantityChange(game.id, quantity - 1)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(game.id, quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <span className={styles.price}>${(game.price * quantity).toFixed(2)}</span>
                  <button 
                    onClick={() => dispatch(removeFromCart(game.id))}
                    className={styles.removeButton}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className={styles.footer}>
          <div className={styles.total}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            className={styles.checkoutButton}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};