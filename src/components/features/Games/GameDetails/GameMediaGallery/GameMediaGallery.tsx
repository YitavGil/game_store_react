// src/components/features/Games/GameDetails/GameMediaGallery/GameMediaGallery.tsx
import React, { useState } from 'react';
import { Screenshot } from '../../../../../types/game.types';
import styles from './GameMediaGallery.module.css';

interface GameMediaGalleryProps {
  screenshots: Screenshot[];
  gameName: string;
}

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  screenshots: Screenshot[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  gameName: string;
}

const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  screenshots,
  currentIndex,
  onNavigate,
  gameName,
}) => {
  if (!isOpen) return null;

  const handlePrevious = () => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : screenshots.length - 1);
  };

  const handleNext = () => {
    onNavigate(currentIndex < screenshots.length - 1 ? currentIndex + 1 : 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div 
      className={styles.modalOverlay} 
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label={`${gameName} screenshot gallery`}
    >
      <div 
        className={styles.modalContent}
        onClick={e => e.stopPropagation()}
      >
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close gallery"
        >
          ×
        </button>
        
        <img
          src={screenshots[currentIndex].image}
          alt={`${gameName} screenshot ${currentIndex + 1}`}
          className={styles.modalImage}
        />

        <div className={styles.navigationButtons}>
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={handleNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>

        <div className={styles.imageCounter}>
          {currentIndex + 1} / {screenshots.length}
        </div>
      </div>
    </div>
  );
};

export const GameMediaGallery: React.FC<GameMediaGalleryProps> = ({ screenshots, gameName }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!screenshots || screenshots.length === 0) {
    return (
      <div className={styles.noMedia}>
        No screenshots available
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Screenshots & Media</h2>
      
      <div className={styles.grid}>
        {screenshots.map((screenshot, index) => (
          <div 
            key={screenshot.id} 
            className={styles.imageContainer}
            onClick={() => {
              setCurrentImageIndex(index);
              setModalOpen(true);
            }}
          >
            <img
              src={screenshot.image}
              alt={`${gameName} screenshot ${index + 1}`}
              className={styles.thumbnail}
              loading="lazy"
            />
            <div className={styles.overlay}>
              <span className={styles.viewIcon}>🔍</span>
            </div>
          </div>
        ))}
      </div>

      <MediaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        screenshots={screenshots}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
        gameName={gameName}
      />
    </div>
  );
};