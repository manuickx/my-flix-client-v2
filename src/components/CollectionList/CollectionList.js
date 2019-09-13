import React from "react";
import { Link } from "react-router-dom";

import MovieCard from "../MovieCard/MovieCard";

function CollectionList({ movies }) {
  return (
    <div>
      <ul className="movies-list">
        {movies.map(movie => (
          <Link key={movie.movie_ref_id} to={`/movies/${movie.movie_ref_id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default CollectionList;
