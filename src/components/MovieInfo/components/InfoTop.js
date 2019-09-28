import React from "react";
import Button from "react-bootstrap/Button";
import noImage from "../../../assets/no-featured-image.png";
import noPoster from "../../../assets/no-poster.png";

function InfoTop({
  movie,
  inCollection,
  addMovieToCollection,
  removeMovieFromCollection,
  item,
  token
}) {
  const { backdrop_path, poster_path } = movie;

  return (
    <div className="info-backdrop">
      {inCollection
        ? token && (
            <Button
              variant="danger"
              className="collection-button"
              onClick={() => removeMovieFromCollection(item)}
            >
              REMOVE FROM FAVOURITES
            </Button>
          )
        : token && (
            <Button
              variant="success"
              className="collection-button"
              onClick={() => addMovieToCollection(item)}
            >
              ADD TO FAVOURITES
            </Button>
          )}
      <img
        className="info-backdrop-image"
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
            : `${noImage}`
        }
        alt=""
      />
      <div className="info-poster-container">
        <a
          href={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
        >
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : `${noPoster}`
            }
            alt=""
          />
        </a>
      </div>
    </div>
  );
}

export default InfoTop;
