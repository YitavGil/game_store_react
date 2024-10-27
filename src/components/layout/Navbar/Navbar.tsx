import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { toggleCart } from '../../../store/features/cart/cartSlice';
import { CartIcon } from '../../features/Cart/CartIcon/CartIcon';
import { CartDropdown } from '../../features/Cart/CartDropdown/CartDropdown';
import styles from './Navbar.module.css';
import classNames from 'classnames';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const handleCartClick = () => {
    if (location.pathname === '/cart') {
      dispatch(toggleCart());
    } else {
      navigate('/cart');
    }
  };

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
          
          <div className={styles.cartContainer}>
            <button 
              className={styles.cartButton}
              onClick={handleCartClick}
            >
              <CartIcon count={cartItemsCount} />
            </button>
            <CartDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};