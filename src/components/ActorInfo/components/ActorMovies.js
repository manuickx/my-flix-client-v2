import React from "react";
import { Link } from "react-router-dom";

import noPoster from "../../../assets/no-poster.png";

function ActorMovies({ movies, shows, isMovie, user }) {
  const noAdultMovies = movies.cast.filter(movie => movie.adult === false);
  const sortedMovies = (user && user.age > 17 ? movies.cast : noAdultMovies)
    .filter(movie => isNaN(movie.release_date))
    .sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date));

  const sortedShows = shows.cast
    .filter(show => isNaN(show.first_air_date))
    .sort(
      (a, b) => Date.parse(b.first_air_date) - Date.parse(a.first_air_date)
    );
  return (
    <div className="actor-movies">
      {isMovie
        ? sortedMovies.map(movie => (
            <div className="actor-movie-info" key={movie.credit_id}>
              <Link to={`/movies/${movie.id}`}>
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
                <Link to={`/movies/${movie.id}`}>
                  {movie.title} (
                  {movie.release_date && movie.release_date.substring(0, 4)})
                </Link>
                <p>{movie.character}</p>
              </div>
            </div>
          ))
        : sortedShows.map(show => (
            <div className="actor-movie-info" key={show.credit_id}>
              <Link to={`/shows/${show.id}`}>
                <img
                  className="actor-movie-poster"
                  src={
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                      : `${noPoster}`
                  }
                  alt=""
                />
              </Link>
              <div>
                <Link to={`/shows/${show.id}`}>
                  {show.original_name} (
                  {show.first_air_date && show.first_air_date.substring(0, 4)})
                </Link>
                <p>{show.character}</p>
              </div>
            </div>
          ))}
    </div>
  );
}

export default ActorMovies;
