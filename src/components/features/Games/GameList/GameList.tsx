import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import { fetchGames } from '../../../../store/features/games/gamesSlice';
import { GameCard } from '../GameCard/GameCard';
import { Button } from '../../../common/Button/Button';
import { Loader } from '../../../common/Loader/Loader';
import styles from './GameList.module.css';

export const GameList: React.FC = () => {
  const dispatch = useAppDispatch();
  const GAMES_PER_PAGE = 12;
  const [visibleGames, setVisibleGames] = useState(GAMES_PER_PAGE);
  
  const {
    games,
    loading,
    error,
    filters,
    pagination: { page, hasMore }
  } = useAppSelector(state => state.games);

  const handleLoadMore = () => {
    setVisibleGames(prev => prev + GAMES_PER_PAGE);
    if (games.length < visibleGames + GAMES_PER_PAGE) {
      dispatch(fetchGames({ 
        page: page + 1,
        search: filters.search,
        parent_platforms: filters.platform, 
        genres: filters.genre,
        ordering: filters.sortBy
      }));
    }
  };

  if (error) {
    return (
      <div className={styles.error}>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <Button onClick={() => dispatch(fetchGames({ ...filters, page: 1 }))}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {games.slice(0, visibleGames).map(game => (
          <div key={game.id} className={styles.gridItem}>
            <GameCard game={game} />
          </div>
        ))}
      </div>

      {loading && <Loader />}
      
      {!loading && hasMore && (
        <div className={styles.loadMoreContainer}>
          <Button 
            variant="primary" 
            size="large"
            onClick={handleLoadMore}
            className={styles.loadMoreButton}
          >
            Load More Games
          </Button>
        </div>
      )}
    </div>
  );
};