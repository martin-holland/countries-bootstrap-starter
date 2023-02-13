import { createSlice } from "@reduxjs/toolkit";

const favourites = localStorage.getItem('Favourites') !== null ? JSON.parse(localStorage.getItem('Favourites')) : []

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: {
        favourites: favourites,
    },
    reducers: {
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

export const {addFavourite, clearFavourites} = favouritesSlice.actions

export default favouritesSlice.reducer;