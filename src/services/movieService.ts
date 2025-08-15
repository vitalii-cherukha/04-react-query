import axios from "axios";
import { Movie } from "../types/movie";


const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

interface TMDBResponse {
    results: Movie[];
    total_pages: number;
}



export const getMovies = async (query: string, page: number): Promise<TMDBResponse> => {
    const { data } = await axios.get<TMDBResponse>("/search/movie", {
        params: {
            query,
            language: "en-US",
            page,

        },
    });
    return {
        results: data.results,
        total_pages: data.total_pages,
    };
}

