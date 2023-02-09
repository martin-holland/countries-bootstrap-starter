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
    clearFavourites(state, _) {
      localStorage.removeItem('Favourites')
      state.favourites = [];
    }
  },
});

export const initializeFavourites = () => {
  return  (dispatch) => {
    // const favourites = getFavouritesFromLocal();
    const favourites = localStorage.getItem('Favourites')
    console.log("Favourites from initialize: ", favourites)
    if(Array.isArray(favourites) && favourites.length > 0) 
    dispatch(getFavourites(favourites));
  };
};

export const { getFavourites, isLoading, addFavourite, clearFavourites  } = favouritesSlice.actions;

export default favouritesSlice.reducer;