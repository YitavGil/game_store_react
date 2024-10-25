import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem } from '../../../types/store.types';
import { Game } from '../../../types/game.types';

const initialState: CartState = {
  items: [],
  total: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Game>) => {
      const existingItem = state.items.find(
        item => item.game.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ game: action.payload, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.game.id !== action.payload);
      state.total = calculateTotal(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ gameId: number; quantity: number }>
    ) => {
      const item = state.items.find(
        item => item.game.id === action.payload.gameId
      );
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = calculateTotal(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.game.price * item.quantity, 0);
};

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
} = cartSlice.actions;
export default cartSlice.reducer;