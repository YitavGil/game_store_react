import { axiosInstance } from './api/config';
import { ENDPOINTS } from './api/endpoints';
import { GameFilters } from '../types/store.types';
import { APIResponse } from '../types/api.types';
import { Game } from '../types/game.types';

export interface GameQueryParams {
  page?: number;
  page_size?: number;
  search?: string;
  parent_platforms?: string;
  genre?: string;      // Changed from genres to genre
  ordering?: string;   // This is what RAWG expects for sorting
}

export const gameService = {
  async getGames(params: GameQueryParams = {}): Promise<APIResponse<Game>> {
    console.log('Fetching games with params:', params);
    

  
    const { data } = await axiosInstance.get(ENDPOINTS.GAMES, { params });
    return {
      ...data,
      results: data.results.map((game: Game) => ({
        ...game,
        price: this.calculateGamePrice(game)
      }))
    };
  },

  async getGameDetails(id: number): Promise<Game> {
    const { data } = await axiosInstance.get(ENDPOINTS.GAME_DETAILS(id));
    return {
      ...data,
      price: this.calculateGamePrice(data)
    };
  },

  async getGameScreenshots(id: number) {
    const { data } = await axiosInstance.get(ENDPOINTS.GAME_SCREENSHOTS(id));
    return data;
  },

  calculateGamePrice(game: Game): number {
    // Simple price calculation based on rating and release date
    const basePrice = 59.99;
    const ratingFactor = game.rating / 5;
    const ageInYears = this.calculateGameAge(game.released);
    const ageFactor = Math.max(0.4, 1 - (ageInYears * 0.1));
    
    return Math.round((basePrice * ratingFactor * ageFactor) * 100) / 100;
  },

  calculateGameAge(releaseDate: string): number {
    const releaseDateObj = new Date(releaseDate);
    const now = new Date();
    return (now.getTime() - releaseDateObj.getTime()) / (1000 * 60 * 60 * 24 * 365);
  }
};