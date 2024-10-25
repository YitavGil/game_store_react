import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  isFiltersOpen: boolean;
  isSearchOpen: boolean;
  activeModal: string | null;
}

const initialState: UIState = {
  theme: 'dark',
  isFiltersOpen: false,
  isSearchOpen: false,
  activeModal: null,
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
  },
});

export const { toggleTheme, toggleFilters, toggleSearch, setActiveModal } =
  uiSlice.actions;
export default uiSlice.reducer;
