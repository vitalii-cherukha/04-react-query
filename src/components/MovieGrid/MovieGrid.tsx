import { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}
const basicsImgUrl: string = 'https://image.tmdb.org/t/p/w500';

const MovieGrid = ({ onSelect, movies }: MovieGridProps) => {
  return (
    <ul className={css.grid}>
      {movies
        .filter(movie => movie.poster_path && movie.backdrop_path)
        .map(movie => (
          <li key={movie.id}>
            <div className={css.card}>
              <img
                onClick={() => onSelect(movie)}
                className={css.image}
                src={basicsImgUrl + movie.poster_path}
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default MovieGrid;
