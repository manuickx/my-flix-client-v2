import React from "react";
import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

import "./MoviesList.sass";

import MovieCard from "../MovieCard/MovieCard";

function MoviesList(props) {
  return (
    <div className="movies-container">
      <InfiniteScroll
        dataLength={props.movies ? props.movies.length : props.shows.length}
        next={props.movies ? props.getMoreMovies : props.getMoreShows}
        hasMore={true}
        loader={
          <div
            className="loader"
            style={props.movies.length > 1 ? { "margin-top": "1%" } : null}
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
          {props.movies
            ? props.movies.map(movie => (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))
            : props.shows.map(show => (
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
