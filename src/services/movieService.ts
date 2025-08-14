import axios from "axios";
import { Movie } from "../types/movie";


const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

interface TMDBResponse {
    results: Movie[];
}

export const getMovies = async (query: string): Promise<Movie[]> => {
    const { data } = await axios.get<TMDBResponse>("/search/movie", {
        params: {
            query,
            language: "en-US",
            page: 1,
        },
    });
    return data.results;
}

