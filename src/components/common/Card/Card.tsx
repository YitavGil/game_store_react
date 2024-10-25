import React from 'react';
import styles from './Card.module.css';
import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  onClick,
  hover = true,
  padding = 'medium',
}) => {
  return (
    <div
      className={classNames(
        styles.card,
        styles[`padding-${padding}`],
        {
          [styles.hover]: hover,
          [styles.clickable]: !!onClick,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};