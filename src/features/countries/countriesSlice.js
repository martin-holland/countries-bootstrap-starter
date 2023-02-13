import { createSlice } from "@reduxjs/toolkit"
import countryService from '../../services/countries'

export const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        countries: [],
        isLoading: true
    },
    reducers: {
        getCountries(state, action) {
            state.countries = action.payload
        },
        isLoading(state, action) {
            state.isLoading = action.payload
        }
    },
})

export const initializeCountries = () => {
    return async (dispatch) => {
        const countries = await countryService.getAll();
        dispatch(getCountries(countries));
        setTimeout(() => dispatch(isLoading(false)), 1000)
        
    }
}

export const {getCountries, isLoading} = countriesSlice.actions

export default countriesSlice.reducer
