import { axiosInstance } from './api/config';
import { ENDPOINTS } from './api/endpoints';
import { GameFilters } from '../types/store.types';
import { APIResponse } from '../types/api.types';
import { Game } from '../types/game.types';
import { GameQueryParams } from '../types/store.types';



export const gameService = {
  async getGames(params: GameQueryParams = {}): Promise<APIResponse<Game>> {
    // Transform params to match API expectations
    const apiParams = {
      ...params,
      genres: params.genres || undefined,  // Only include if it exists
      parent_platforms: params.parent_platforms || undefined,
      ordering: params.ordering || undefined,
      page: params.page || 1
    };
   
    const { data } = await axiosInstance.get(ENDPOINTS.GAMES, { 
      params: apiParams
    });
        
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