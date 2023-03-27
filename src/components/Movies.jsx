import Movie from './Movie';
import '../styles/movies.scss';
import useInfiniteScroll from '../hooks/useInfiniteScrolling';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

const Movies = ({ movies, viewTrailer, onEndReach }) => {
  const { loaderRef } = useInfiniteScroll(onEndReach);

  const { total_pages: totalPages, page } = useSelector((state) => state.movies.movies);
  const isLastPage = page >= totalPages;

  return (
    <Fragment>
      <div className="movies" data-testid="movies">
        {movies.map((movie) => (
          <Movie
            movie={movie}
            key={movie.id}
            viewTrailer={viewTrailer}
          />
        ))}
      </div>
      {onEndReach && !isLastPage && <LoadingSpinner ref={loaderRef} />}
    </Fragment>
  );
};

export default Movies;
