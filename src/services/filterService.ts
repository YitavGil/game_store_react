import { axiosInstance } from './api/config';
import { ENDPOINTS } from './api/endpoints';
import { Genre, Platform } from '../types/game.types';

export const filterService = {
  async getGenres() {
    const { data } = await axiosInstance.get(ENDPOINTS.GENRES);
    return data.results;
  },

  async getPlatforms() {
    const { data } = await axiosInstance.get(ENDPOINTS.PLATFORMS);
    return data.results;
  },

  async getTags() {
    const { data } = await axiosInstance.get(ENDPOINTS.TAGS);
    return data.results;
  }
};