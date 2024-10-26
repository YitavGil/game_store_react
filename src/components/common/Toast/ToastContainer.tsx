import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { removeToast } from '../../../store/features/ui/uiSlice';
import { Toast } from './Toast';
import styles from './ToastContainer.module.css';

export const ToastContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(state => state.ui.toasts);

  const handleClose = (id: string) => {
    dispatch(removeToast(id));
  };

  return (
    <div className={styles.container}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => handleClose(toast.id)}
        />
      ))}
    </div>
  );
};