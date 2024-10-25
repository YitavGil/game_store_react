import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { gameService } from '../../../services';
import { 
  GamesState, 
  GameFilters, 
  GameQueryParams,
} from '../../../types/store.types';
import { Game } from '../../../types/game.types';
import { APIResponse } from '../../../types/api.types';

const initialState: GamesState = {
  games: [],
  filteredGames: [],
  selectedGame: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    genre: '',
    platform: '',
    releaseDate: '',
     sortBy: 'relevance'
  },
  pagination: {
    page: 1,
    hasMore: true,
  },
  hasMore: true,
};

export const fetchGames = createAsyncThunk<
  APIResponse<Game>,
  GameQueryParams
>('games/fetchGames', async (params, { rejectWithValue }) => {
  try {
    const response = await gameService.getGames(params);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchGameDetails = createAsyncThunk<
  Game,
  number
>('games/fetchGameDetails', async (gameId, { rejectWithValue }) => {
  try {
    const response = await gameService.getGameDetails(gameId);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<GameFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.pagination.page = 1;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.games = action.payload.results;
        state.hasMore = action.payload.next !== null;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedGame = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasMore = false;
      });
  },
});

export const { setFilters, setSearchQuery, resetFilters } = gamesSlice.actions;
export default gamesSlice.reducer;