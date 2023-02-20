import { createSlice } from "@reduxjs/toolkit";

const favourites = localStorage.getItem('Favourites') !== null ? JSON.parse(localStorage.getItem('Favourites')) : []

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: {
        favourites: favourites,
    },
    reducers: {
        addFavourite(state, action) {
            // The line below is not necessary, but can be useful as a check to see if the favourites localStorage already contains data here.
            if (state.favourites.some(fav => fav === action.payload)) state.favourites = [...state.favourites]
            state.favourites = [...state.favourites, action.payload]
            localStorage.setItem('Favourites', JSON.stringify(state.favourites))
        },
        removeFavourite(state, action) {
            const newArray = [...state.favourites]
            newArray.splice(newArray.findIndex(e => e === action.payload), 1)
            state.favourites = [...newArray]
        },
        clearFavourites(state, action) {
            localStorage.removeItem('Favourites')
            state.favourites = [];
        }

    }
})

export const {addFavourite, removeFavourite, clearFavourites} = favouritesSlice.actions

export default favouritesSlice.reducer;