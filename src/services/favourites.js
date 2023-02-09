export const getFavouritesFromLocal = () => {
    const favourites = localStorage.getItem('Favourites')
    if (Array.isArray(favourites)) {

        return favourites
    }
    else {

        return []
    }
}