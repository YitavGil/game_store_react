import React from 'react';
import { useAppSelector } from '../../../../store/hooks';
import styles from './CartIcon.module.css';

interface CartIconProps {
  count?: number;
}

export const CartIcon: React.FC<CartIconProps> = ({ count }) => {
  const isOpen = useAppSelector(state => state.cart.isOpen);

  return (
    <div className={styles.container}>
      <div className={`${styles.icon} ${isOpen ? styles.active : ''}`}>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {count !== undefined && count > 0 && (
          <span className={styles.badge}>{count > 99 ? '99+' : count}</span>
        )}
      </div>
    </div>
  );
};