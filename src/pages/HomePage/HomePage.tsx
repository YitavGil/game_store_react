// src/pages/HomePage/HomePage.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { SearchBar } from '../../components/features/Games/SearchBar/SearchBar';
import GameFiltersComponent, { GameFiltersOutput } from '../../components/features/Games/Filters/GameFilters';
import { GameList } from '../../components/features/Games/GameList/GameList';
import { setFilters, fetchGames } from '../../store/features/games/gamesSlice';
import { RootState } from '../../store/store';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentFilters = useSelector((state: RootState) => state.games.filters);

  const handleFilterChange = (newFilters: GameFiltersOutput) => {
    dispatch(setFilters(newFilters));
    dispatch(fetchGames({ 
      page: 1,
      search: newFilters.search,
      parent_platforms: newFilters.platform,
      genre: newFilters.genre,        // Changed from genres to genre
      ordering: newFilters.sortBy     // This maps to RAWG's ordering parameter
    }));
  };

  return (
    <div className={styles.container}>
    <div className={styles.searchContainer}>
      <h1 className={styles.title}>Discover Games</h1>
      <div className={styles.searchRow}>
        <SearchBar />
        <GameFiltersComponent 
          onFilterChange={handleFilterChange}
          initialFilters={currentFilters}
        />
      </div>
    </div>
    <GameList />
  </div>
  );
};