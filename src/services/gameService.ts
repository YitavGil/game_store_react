import { axiosInstance } from './api/config';
import { ENDPOINTS } from './api/endpoints';
import { APIResponse } from '../types/api.types';
import { Game } from '../types/game.types';
import { GameQueryParams } from '../types/store.types';



export const gameService = {
  async getGames(params: GameQueryParams = {}): Promise<APIResponse<Game>> {
    // Transform params to match API expectations
    const apiParams = {
      ...params,
      genres: params.genres || undefined, 
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

  async getGameDetails(id: string | number): Promise<Game> {
    try {
      const gameId = id.toString();
      
      const [gameResponse, screenshotsResponse, similarGamesResponse] = await Promise.all([
        axiosInstance.get(ENDPOINTS.GAME_DETAILS(Number(gameId))),
        axiosInstance.get(ENDPOINTS.GAME_SCREENSHOTS(Number(gameId))),
        axiosInstance.get(`${ENDPOINTS.GAMES}`, {
          params: {
            genres: gameId, 
            page_size: 6,
            exclude_current: true
          }
        })
      ]);

      const gameData = gameResponse.data;
      const screenshots = screenshotsResponse.data.results;
      const similarGames = similarGamesResponse.data.results.map((game: Game) => ({
        ...game,
        price: this.calculateGamePrice(game)
      }));

      // Combine the data and calculate price
      const enrichedGame: Game = {
        ...gameData,
        screenshots,
        similar_games: similarGames,
        price: this.calculateGamePrice(gameData),
        hasMore: true
      };

      return enrichedGame;

    } catch (error) {
      console.error('Error fetching game details:', error);
      throw error;
    }
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