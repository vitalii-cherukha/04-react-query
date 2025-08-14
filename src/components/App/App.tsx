import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import { getMovies } from '../../services/movieService';
import { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const handleSubmit = async (query: string) => {
    setIsLoading(true);
    setIsError(false);
    setIsEmpty(false);
    setMovies([]);
    const data = await getMovies(query);
    try {
      if (!data.length) {
        toast('No movies found for your request');
        setIsEmpty(true);
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelect = (movie: Movie) => {
    setSelectMovie(movie);
  };
  const onClose = () => {
    setSelectMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      <MovieGrid movies={movies} onSelect={onSelect} />
      {isEmpty && <p>Movies not found</p>}
      {isError && <ErrorMessage />}
      {selectMovie && <MovieModal movie={selectMovie} onClose={onClose} />}
      {isLoading && <Loader />}
      <Toaster />
    </div>
  );
};

export default App;
