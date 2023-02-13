import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: {
        favourites: [],
    },
    reducers: {
        getFavourites(state, action) {
            state.favourites = action.payload
        },
        addFavourite(state, action) {
            state.favourites = [...state.favourites, action.payload]
            localStorage.setItem('Favourites', JSON.stringify(state.favourites))
        },
        clearFavourites(state, action) {
            localStorage.removeItem('Favourites')
            state.favourites = [];
        }

    }
})

export const initializeFavourites = () => {
    return (dispatch) => {
        const favourites = localStorage.getItem('Favourites')
        if (favourites !== null) dispatch(getFavourites(favourites));
    }
}

export const {getFavourites, addFavourite, clearFavourites} = favouritesSlice.actions

export default favouritesSlice.reducer;