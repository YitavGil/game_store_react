import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!API_KEY || !BASE_URL) {
  throw new Error('Missing required environment variables');
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY
  }
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);