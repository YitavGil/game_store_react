import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CartState, CartItem } from '../../../types/store.types';
import { Game } from '../../../types/game.types';
import { showToast } from '../ui/uiSlice';
import { storageService } from '../../../services';

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const discount = item.game.rating > 4 ? 0.2 : item.game.rating > 3 ? 0.1 : 0;
    const finalPrice = item.game.price * (1 - discount);
    return total + finalPrice * item.quantity;
  }, 0);
};

const loadInitialState = (): CartState => {
  const savedCart = storageService.getItem<CartItem[]>('CART');
  if (savedCart) {
    return {
      items: savedCart,
      total: calculateTotal(savedCart),
      isOpen: false,
    };
  }
  return {
    items: [],
    total: 0,
    isOpen: false,
  };
};

export const addToCartWithNotification = createAsyncThunk<void, Game>(
  'cart/addToCartWithNotification',
  async (game, { dispatch }) => {
    dispatch(addToCart(game));
    dispatch(showToast({
      message: `${game.name} added to cart!`,
      type: 'success',
    }));
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadInitialState(),
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
      storageService.setItem('CART', state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.game.id !== action.payload);
      state.total = calculateTotal(state.items);
      storageService.setItem('CART', state.items);
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
        storageService.setItem('CART', state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      storageService.removeItem('CART');
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;