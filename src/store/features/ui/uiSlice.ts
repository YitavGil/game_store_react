import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UIState {
  theme: 'light' | 'dark';
  isFiltersOpen: boolean;
  isSearchOpen: boolean;
  activeModal: string | null;
  toasts: ToastMessage[]; 
}

const initialState: UIState = {
  theme: 'dark',
  isFiltersOpen: false,
  isSearchOpen: false,
  activeModal: null,
  toasts: [], 
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleFilters: (state) => {
      state.isFiltersOpen = !state.isFiltersOpen;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    showToast: (state, action: PayloadAction<Omit<ToastMessage, 'id'>>) => {
      state.toasts.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
  },
});

export const { 
  toggleTheme, 
  toggleFilters, 
  toggleSearch, 
  setActiveModal,
  showToast,
  removeToast 
} = uiSlice.actions;

export default uiSlice.reducer;