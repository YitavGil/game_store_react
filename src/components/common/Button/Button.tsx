import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'light';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
          [styles.loading]: isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className={styles.loadingSpinner} />
      ) : (
        children
      )}
    </button>
  );
};