import axios from "axios";

const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { getAll }

