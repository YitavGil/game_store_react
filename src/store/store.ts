import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './features/games/gamesSlice';
import cartReducer from './features/cart/cartSlice';
import uiReducer from './features/ui/uiSlice';
import commentsReducer from './features/comments/commentsSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    cart: cartReducer,
    ui: uiReducer,
    comments: commentsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;