// src/components/features/Games/Filters/GameFilters.tsx
import React, { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import styles from "./GameFilters.module.css";

// Internal component state interface
interface LocalGameFilters {
  search: string;
  genre: string;
  platform: string;
  releaseDate: string;
  genres: string[];
  platforms: string[];
  priceRange: number[];
  sortBy: string;
}

export interface GameFiltersOutput {
  search: string;
  genre: string;
  platform: string;
  releaseDate: string;
  sortBy: string; // Add this back
}
interface GameFiltersProps {
  onFilterChange: (filters: GameFiltersOutput) => void;
  initialFilters: GameFiltersOutput;
}

const GameFilters: React.FC<GameFiltersProps> = ({
  onFilterChange,
  initialFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState<LocalGameFilters>({
    search: initialFilters.search,
    genre: initialFilters.genre,
    platform: initialFilters.platform,
    releaseDate: initialFilters.releaseDate,
    genres: initialFilters.genre
      ? initialFilters.genre.split(",").filter(Boolean)
      : [],
    platforms: initialFilters.platform
      ? initialFilters.platform.split(",").filter(Boolean)
      : [],
    priceRange: [0, 100],
    sortBy: "relevance",
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const platforms = [
    { name: "PC", id: 1, key: "pc-1" }, // Added key for React
    { name: "PlayStation 5", id: 187, key: "ps5-187" },
    { name: "Xbox Series X", id: 186, key: "xbox-186" },
    { name: "Nintendo Switch", id: 7, key: "switch-7" },
    { name: "PlayStation 4", id: 18, key: "ps4-18" },
    { name: "Xbox One", id: 1, key: "xbox-1" },
  ];

  const genres = [
    { name: "Action", id: 4, slug: "action" },
    { name: "Adventure", id: 3, slug: "adventure" },
    { name: "RPG", id: 5, slug: "role-playing-games-rpg" },
    { name: "Strategy", id: 10, slug: "strategy" },
    { name: "Shooter", id: 2, slug: "shooter" },
    { name: "Simulation", id: 14, slug: "simulation" },
    { name: "Sports", id: 15, slug: "sports" },
    { name: "Puzzle", id: 7, slug: "puzzle" }  
  ];

  const sortOptions = [
    { value: "", label: "Relevance" },
    { value: "-released", label: "Release Date: Newest" },
    { value: "released", label: "Release Date: Oldest" },
    { value: "-rating", label: "Rating: High to Low" },
    { value: "rating", label: "Rating: Low to High" },
    { value: "name", label: "Name: A-Z" },
    { value: "-name", label: "Name: Z-A" },
];

  useEffect(() => {
    const count =
      localFilters.genres.length +
      localFilters.platforms.length +
      (localFilters.sortBy !== "relevance" ? 1 : 0) +
      (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 100
        ? 1
        : 0);
    setActiveFiltersCount(count);
  }, [localFilters]);

  const handleGenreToggle = (genre: {
    name: string;
    id: number;
    slug: string;
  }) => {
    setLocalFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre.slug) // Use slug instead of id
        ? prev.genres.filter((g) => g !== genre.slug)
        : [...prev.genres, genre.slug],
    }));
  };

  const handlePlatformToggle = (platform: {
    name: string;
    id: number;
    key: string;
  }) => {
    setLocalFilters((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform.id.toString())
        ? prev.platforms.filter((p) => p !== platform.id.toString())
        : [...prev.platforms, platform.id.toString()],
    }));
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const isMin = e.target.name === "minPrice";

    setLocalFilters((prev) => ({
      ...prev,
      priceRange: isMin
        ? [value, prev.priceRange[1]]
        : [prev.priceRange[0], value],
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    
    setLocalFilters((prev) => ({
      ...prev,
      sortBy: newSortBy,
    }));
  
    // Immediately apply the sort
    const outputFilters: GameFiltersOutput = {
      search: localFilters.search,
      genre: localFilters.genres.join(','),
      platform: localFilters.platforms.join(','),
      releaseDate: localFilters.releaseDate,
      sortBy: newSortBy  // Use the new value directly
    };
    onFilterChange(outputFilters);
  };

  const handleApplyFilters = () => {
    const outputFilters: GameFiltersOutput = {
      search: localFilters.search,
      genre: localFilters.genres.join(','),  // We're joining the slugs directly
      platform: localFilters.platforms.join(','),
      releaseDate: localFilters.releaseDate,
      sortBy: localFilters.sortBy
    };
    onFilterChange(outputFilters);
    setIsExpanded(false);
  };

  const handleClearFilters = () => {
    const clearedLocalFilters: LocalGameFilters = {
      search: "",
      genre: "",
      platform: "",
      releaseDate: "",
      genres: [],
      platforms: [],
      priceRange: [0, 100],
      sortBy: "relevance",
    };

    const clearedOutputFilters: GameFiltersOutput = {
      search: "",
      genre: "",
      platform: "",
      releaseDate: "",
      sortBy: "relevance", // Add this
    };

    setLocalFilters(clearedLocalFilters);
    onFilterChange(clearedOutputFilters);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button
          className={`${styles.filterButton} ${
            isExpanded ? styles.active : ""
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <SlidersHorizontal className={styles.icon} />
          Filters
          {activeFiltersCount > 0 && (
            <span className={styles.badge}>{activeFiltersCount}</span>
          )}
        </button>

        <select
          className={styles.sortSelect}
          value={localFilters.sortBy}
          onChange={handleSortChange}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.filtersGrid}>
            {/* Genres */}
            <div className={styles.filterSection}>
              <h3>Genres</h3>
              <div className={styles.tagsContainer}>
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    className={`${styles.tag} ${
                      localFilters.genres.includes(genre.slug) // Use slug here too
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => handleGenreToggle(genre)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div className={styles.filterSection}>
              <h3>Platforms</h3>
              <div className={styles.tagsContainer}>
                {platforms.map((platform) => (
                  <button
                    key={platform.key} // Use the unique key here
                    className={`${styles.tag} ${
                      localFilters.platforms.includes(platform.id.toString())
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => handlePlatformToggle(platform)}
                  >
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className={styles.filterSection}>
              <h3>Price Range</h3>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  name="minPrice"
                  min="0"
                  max={localFilters.priceRange[1]}
                  value={localFilters.priceRange[0]}
                  onChange={handlePriceRangeChange}
                  className={styles.priceInput}
                />
                <span>to</span>
                <input
                  type="number"
                  name="maxPrice"
                  min={localFilters.priceRange[0]}
                  max="100"
                  value={localFilters.priceRange[1]}
                  onChange={handlePriceRangeChange}
                  className={styles.priceInput}
                />
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.clearButton} onClick={handleClearFilters}>
              <X className={styles.icon} />
              Clear All
            </button>
            <button className={styles.applyButton} onClick={handleApplyFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default GameFilters;
