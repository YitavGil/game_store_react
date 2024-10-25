import React from 'react';
import styles from './Loader.module.css';
import classNames from 'classnames';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  className,
  fullScreen = false,
}) => {
  return (
    <div
      className={classNames(
        styles.loaderContainer,
        { [styles.fullScreen]: fullScreen },
        className
      )}
    >
      <div className={classNames(styles.loader, styles[size])}>
        <div className={styles.spinner}>
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className={styles.blade}
              style={{
                transform: `rotate(${index * 30}deg)`,
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};