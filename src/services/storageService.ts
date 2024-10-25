const STORAGE_KEYS = {
    CART: 'game_store_cart',
    FAVORITES: 'game_store_favorites',
    USER_RATINGS: 'game_store_ratings',
    THEME: 'game_store_theme'
  } as const;
  
  export const storageService = {
    getItem<T>(key: keyof typeof STORAGE_KEYS): T | null {
      try {
        const item = localStorage.getItem(STORAGE_KEYS[key]);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error(`Error getting item from storage: ${key}`, error);
        return null;
      }
    },
  
    setItem<T>(key: keyof typeof STORAGE_KEYS, value: T): void {
      try {
        localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting item in storage: ${key}`, error);
      }
    },
  
    removeItem(key: keyof typeof STORAGE_KEYS): void {
      try {
        localStorage.removeItem(STORAGE_KEYS[key]);
      } catch (error) {
        console.error(`Error removing item from storage: ${key}`, error);
      }
    }
  };