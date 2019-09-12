import React from "react";
import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

import "./MoviesList.sass";

import MovieCard from "../MovieCard/MovieCard";

function MoviesList({ movies, shows, getMoreMovies, getMoreShows }) {
  return (
    <div className="movies-container">
      <InfiniteScroll
        dataLength={movies ? movies.length : shows.length}
        next={movies ? getMoreMovies : getMoreShows}
        hasMore={true}
        loader={
          <div
            className="loader"
            style={
              movies
                ? movies.length > 1
                  ? { marginTop: "1%" }
                  : null
                : shows.length > 1
                ? { marginTop: "1%" }
                : null
            }
          >
            <div className="lds-roller" key={0}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        }
      >
        <ul className="movies-list">
          {movies
            ? movies.map(movie => (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))
            : shows.map(show => (
                <Link key={show.id} to={`/shows/${show.id}`}>
                  <MovieCard movie={show} />
                </Link>
              ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default MoviesList;
