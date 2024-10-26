import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { SearchBar } from '../../components/features/Games/SearchBar/SearchBar';
import GameFiltersComponent, { GameFiltersOutput } from '../../components/features/Games/Filters/GameFilters';
import { GameList } from '../../components/features/Games/GameList/GameList';
import { setFilters, fetchGames } from '../../store/features/games/gamesSlice';
import { RootState } from '../../store/store';
import { GameQueryParams } from '../../types/store.types';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentFilters = useSelector((state: RootState) => state.games.filters);

  const handleFilterChange = (newFilters: GameFiltersOutput) => {
    
    const queryParams: GameQueryParams = {
      page: 1,
      search: newFilters.search,
      genres: newFilters.genre,
      parent_platforms: newFilters.platform,
      ordering: newFilters.sortBy || undefined  
    };
    
    dispatch(setFilters(newFilters));
    dispatch(fetchGames(queryParams));
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