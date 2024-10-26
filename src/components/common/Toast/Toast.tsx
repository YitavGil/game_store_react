import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return createPortal(
    <div className={`${styles.toast} ${styles[type]}`}>
      {type === 'success' && <span className={styles.icon}>✓</span>}
      {type === 'error' && <span className={styles.icon}>✕</span>}
      {type === 'info' && <span className={styles.icon}>ℹ</span>}
      <p className={styles.message}>{message}</p>
    </div>,
    document.body
  );
};