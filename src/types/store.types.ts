import { Game } from "./game.types";

export interface GameQueryParams {
  page?: number;
  search?: string;
  genres?: string;        
  parent_platforms?: string;
  releaseDate?: string;
  ordering?: string;
}
export interface RootState {
    games: GamesState;
    cart: CartState;
    comments: CommentsState;
    ui: UIState;
  }

  export interface UIState {
    theme: 'light' | 'dark';
    isFiltersOpen: boolean;
    isSearchOpen: boolean;
    activeModal: string | null;
    toasts: ToastMessage[];
  }

  export interface ToastMessage {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }
  
  export interface GamesState {
    games: Game[];
    filteredGames: Game[];
    selectedGame: Game | null;
    loading: boolean;
    error: string | null;
    filters: GameFilters;
    pagination: {
      page: number;
      hasMore: boolean;
    };
    hasMore: boolean; 
  }
  
  export interface GameFilters {
    search: string;
    genre: string;
    platform: string;
    releaseDate: string;
    sortBy: string;  
  }
  
  export interface PaginationState {
    page: number;
    hasMore: boolean;
  }
  
  export interface CartState {
    items: CartItem[];
    total: number;
    isOpen: boolean;
  }
  
  export interface CartItem {
    game: Game;
    quantity: number;
  }
  
  export interface CommentsState {
    byGameId: {
      [key: string]: Comment[];
    };
    loading: boolean;
    error: string | null;
  }
  
  export interface Comment {
    id: string;
    gameId: number;
    user: string;
    content: string;
    createdAt: string;
  }