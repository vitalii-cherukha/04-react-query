import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import { getMovies } from '../../services/movieService';
import { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => getMovies(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data.results.length === 0) {
      toast.error('Movies not found');
    }
  });

  const handleSubmit = async (value: string) => {
    setQuery(value);
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
      {isSuccess && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isSuccess && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={onSelect} />
      )}
      {selectMovie && <MovieModal movie={selectMovie} onClose={onClose} />}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <Toaster />
    </div>
  );
};

export default App;
