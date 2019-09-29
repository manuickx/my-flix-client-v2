import React from "react";

import "./MovieCard.sass";

function MovieCard({ movie }) {
  let rating = Math.round((movie.vote_average / 2) * 10) / 10;

  const { poster_path, overview } = movie;
  const i_title = movie.title ? movie.title : movie.name;

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png"
          }
          alt=""
        ></img>
      </div>
      <div className="movie-details">
        <h2>{i_title}</h2>
        <div className="rating">
          <i
            className={rating >= 1 ? "fa fa-star" : "fa fa-star-o"}
            aria-hidden="true"
          ></i>
          <i
            className={rating >= 2 ? "fa fa-star" : "fa fa-star-o"}
            aria-hidden="true"
          ></i>
          <i
            className={rating >= 3 ? "fa fa-star" : "fa fa-star-o"}
            aria-hidden="true"
          ></i>
          <i
            className={rating >= 4 ? "fa fa-star" : "fa fa-star-o"}
            aria-hidden="true"
          ></i>
          <i
            className={rating === 5 ? "fa fa-star" : "fa fa-star-o"}
            aria-hidden="false"
          ></i>
          <span>{rating}/5</span>
        </div>
        <div className="movie-info">
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
