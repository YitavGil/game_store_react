import React from 'react';
import styles from './GameDetailsContent.module.css';
import { Game } from '../../../../../types/game.types';

interface GameDetailsContentProps {
  game: Game;
}

export const GameDetailsContent: React.FC<GameDetailsContentProps> = ({ game }) => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <section className={styles.description}>
          <h2>About {game.name}</h2>
          <p className={styles.descriptionText}>
            {game.description_raw}
          </p>
        </section>

        <section className={styles.metadata}>
          <h3>Game Details</h3>
          <div className={styles.metadataGrid}>
            {game.developers && game.developers.length > 0 && (
              <div className={styles.metadataItem}>
                <span className={styles.label}>Developer</span>
                <span className={styles.value}>
                  {game.developers.map(dev => dev.name).join(', ')}
                </span>
              </div>
            )}

            {game.publishers && game.publishers.length > 0 && (
              <div className={styles.metadataItem}>
                <span className={styles.label}>Publisher</span>
                <span className={styles.value}>
                  {game.publishers.map(pub => pub.name).join(', ')}
                </span>
              </div>
            )}

            {game.released && (
              <div className={styles.metadataItem}>
                <span className={styles.label}>Release Date</span>
                <span className={styles.value}>
                  {new Date(game.released).toLocaleDateString()}
                </span>
              </div>
            )}

            {game.metacritic && (
              <div className={styles.metadataItem}>
                <span className={styles.label}>Metacritic Score</span>
                <span className={`${styles.value} ${styles.metacritic}`}>
                  {game.metacritic}
                </span>
              </div>
            )}

            {game.esrb_rating && (
              <div className={styles.metadataItem}>
                <span className={styles.label}>ESRB Rating</span>
                <span className={styles.value}>{game.esrb_rating.name}</span>
              </div>
            )}

            {game.platforms && (
              <div className={styles.metadataItem}>
                <span className={styles.label}>Platforms</span>
                <span className={styles.value}>
                  {game.platforms
                    .map(p => p.platform.name)
                    .join(', ')}
                </span>
              </div>
            )}

            {game.genres && (
              <div className={styles.metadataItem}>
                <span className={styles.label}>Genres</span>
                <span className={styles.value}>
                  {game.genres.map(g => g.name).join(', ')}
                </span>
              </div>
            )}
          </div>
        </section>

        {(game.website || game.reddit_url || game.metacritic_url) && (
          <section className={styles.links}>
            <h3>Links</h3>
            <div className={styles.linkGrid}>
              {game.website && (
                <a 
                  href={game.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Official Website
                </a>
              )}
              {game.reddit_url && (
                <a 
                  href={game.reddit_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Reddit Community
                </a>
              )}
              {game.metacritic_url && (
                <a 
                  href={game.metacritic_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Metacritic Reviews
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};