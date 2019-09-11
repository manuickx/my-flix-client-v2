import React from "react";
// import "./InfoTop.sass";

function InfoTop({ movie }) {
  const { backdrop_path, poster_path } = movie;

  return (
    <div className="info-backdrop">
      <img
        className="info-backdrop-image"
        src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
        alt=""
      />
      <div className="info-poster-container">
        <a href={`https://image.tmdb.org/t/p/w500${poster_path}`}>
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="" />
        </a>
      </div>
    </div>
  );
}

export default InfoTop;
