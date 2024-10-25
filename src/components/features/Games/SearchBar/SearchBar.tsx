import React, { useState, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { fetchGames } from '../../../../store/features/games/gamesSlice';
import { useDebounce } from '../../../../hooks/useDebounce';
import styles from './SearchBar.module.css';

export const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [localSearch, setLocalSearch] = useState('');

  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    dispatch(fetchGames({ 
      search: debouncedSearch,
      page: 1 // Reset to first page when searching
    }));
  }, [debouncedSearch, dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(event.target.value);
  };

  const handleClear = () => {
    setLocalSearch('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <svg 
          className={styles.searchIcon}
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={localSearch}
          onChange={handleSearch}
          placeholder="Search for games..."
          className={styles.input}
        />
        {localSearch && (
          <button 
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};