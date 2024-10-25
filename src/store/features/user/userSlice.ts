import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  favorites: number[];
  ratings: { [gameId: number]: number };
}

const initialState: UserState = {
  favorites: [],
  ratings: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const gameId = action.payload;
      const index = state.favorites.indexOf(gameId);
      if (index === -1) {
        state.favorites.push(gameId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    setRating: (
      state,
      action: PayloadAction<{ gameId: number; rating: number }>
    ) => {
      const { gameId, rating } = action.payload;
      state.ratings[gameId] = rating;
    },
  },
});

export const { toggleFavorite, setRating } = userSlice.actions;
export default userSlice.reducer;