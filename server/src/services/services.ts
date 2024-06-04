import { API_URI, API_KEY } from "../config/config.js";

const fetchMovies = async (queryString: string) => {
    const url = new URL(`${API_URI}${API_KEY}&s=${queryString}`);
    const response = await fetch(url);
    return response;
}

const fetchMovie = async (queryString: string) => {
    const url = new URL(`${API_URI}${API_KEY}&t=${queryString}`);
    const response = await fetch(url);
    return response;
}

export { fetchMovies, fetchMovie };
