import React from "react";
import { Link } from "react-router-dom";
import noPoster from "../../../assets/no-poster.png";

function ActorMovies({ movies, type }) {
  return (
    <div className="actor-movies">
      {movies.cast
        .filter(movie =>
          isNaN(type ? movie.release_date : movie.first_air_date)
        )
        .sort(
          (a, b) =>
            Date.parse(type ? b.release_date : b.first_air_date) -
            Date.parse(type ? a.release_date : a.first_air_date)
        )
        .map(movie => (
          <div className="actor-movie-info" key={movie.id}>
            <Link to={type ? `/movies/${movie.id}` : `/shows/${movie.id}`}>
              <img
                className="actor-movie-poster"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : `${noPoster}`
                }
                alt=""
              />
            </Link>
            <div>
              <Link to={type ? `/movies/${movie.id}` : `/shows/${movie.id}`}>
                {type ? movie.title : movie.original_name} (
                {type
                  ? movie.release_date && movie.release_date.substring(0, 4)
                  : movie.first_air_date &&
                    movie.first_air_date.substring(0, 4)}
                )
              </Link>
              <p>{movie.character}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ActorMovies;
