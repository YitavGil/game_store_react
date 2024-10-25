// src/components/features/Games/GameDetails/SimilarGames/SimilarGames.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Game } from '../../../../../types/game.types';
import { StarRating } from '../../../Rating/StarRating/StarRating';
import { PlatformIcons } from '../../PlatformIcons/PlatformIcons';
import styles from './SimilarGames.module.css';

interface SimilarGamesProps {
  games: Game[];
  currentGameId: number;
}

export const SimilarGames: React.FC<SimilarGamesProps> = ({ games, currentGameId }) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Filter out the current game and limit to 6 games
  const filteredGames = games
    .filter(game => game.id !== currentGameId)
    .slice(0, 6);

  if (filteredGames.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Similar Games You Might Like</h2>
      
      <div className={styles.grid}>
        {filteredGames.map((game, index) => (
          <div
            key={game.id}
            className={styles.gameCard}
            onClick={() => navigate(`/game/${game.id}`)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.imageContainer}>
              <img
                src={game.background_image}
                alt={game.name}
                className={styles.image}
                loading="lazy"
              />
              <div className={`${styles.overlay} ${hoveredIndex === index ? styles.showOverlay : ''}`}>
                <span className={styles.viewDetails}>View Details</span>
              </div>
            </div>

            <div className={styles.content}>
              <h3 className={styles.gameName}>{game.name}</h3>
              
              <div className={styles.metadata}>
                <div className={styles.rating}>
                  <StarRating 
                    value={game.rating} 
                    readOnly 
                    size="small" 
                    showValue={false} 
                  />
                  <span className={styles.ratingValue}>
                    {game.rating.toFixed(1)}
                  </span>
                </div>

                <div className={styles.platforms}>
                  <PlatformIcons platforms={game.platforms || []} />
                </div>
              </div>

              <div className={styles.price}>
                ${game.price.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};