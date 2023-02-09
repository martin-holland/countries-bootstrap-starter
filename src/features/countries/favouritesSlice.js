import { createSlice } from '@reduxjs/toolkit';

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: [],
  },
  reducers: {
    getFavourites(state, action) {
      state.favourites = [...state.favourites, action.payload];
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    addFavourite(state, action) {
      state.favourites = [action.payload, ...state.favourites]
      localStorage.setItem('Favourites', JSON.stringify(state.favourites));
    },
    removeFavourite(state, action) {
      // Add in remove favourites here
    },
    clearFavourites(state, _) {
      localStorage.removeItem('Favourites')
      state.favourites = [];
    }
  },
});

export const { getFavourites, isLoading, addFavourite, clearFavourites  } = favouritesSlice.actions;

export default favouritesSlice.reducer;