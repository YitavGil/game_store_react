import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { toggleCart } from '../../../store/features/cart/cartSlice';
import { CartIcon } from '../../features/Cart/CartIcon/CartIcon';
import styles from './Navbar.module.css';
import classNames from 'classnames';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItemsCount = useAppSelector(state => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={classNames(styles.navbar, { [styles.scrolled]: isScrolled })}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          <span className={styles.gamepad}>🎮</span>
          GameVault
        </Link>

        <div className={styles.actions}>
          <Link to="/favorites" className={styles.iconButton}>
            ❤️
          </Link>
          
          <button 
            className={styles.cartButton}
            onClick={() => dispatch(toggleCart())}
          >
            <CartIcon count={cartItemsCount} />
          </button>
        </div>
      </div>
    </nav>
  );
};