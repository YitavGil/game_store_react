// src/components/features/Rating/StarRating/StarRating.tsx
import React from 'react';
import styles from './StarRating.module.css';

interface StarRatingProps {
  value: number;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  maxStars?: number;
  showValue?: boolean; // Add this prop to control rating number visibility
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  readOnly = false,
  size = 'medium',
  maxStars = 5,
  showValue = false // Default to false
}) => {
  const fullStars = Math.floor(value);
  const hasHalf = value % 1 !== 0;

  return (
    <div className={`${styles.container} ${styles[size]}`}>
      {/* Full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <span key={`full-${index}`} className={`${styles.star} ${styles.filled}`}>
          ★
        </span>
      ))}
      
      {/* Half star */}
      {hasHalf && (
        <span className={`${styles.star} ${styles.filled}`}>
          ½
        </span>
      )}
      
      {/* Empty stars */}
      {[...Array(maxStars - fullStars - (hasHalf ? 1 : 0))].map((_, index) => (
        <span key={`empty-${index}`} className={styles.star}>
          ★
        </span>
      ))}
      
      {/* Only show rating number if showValue is true */}
      {showValue && (
        <span className={styles.ratingNumber}>{value.toFixed(1)}</span>
      )}
    </div>
  );
};