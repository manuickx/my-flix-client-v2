import React from "react";
import Button from "react-bootstrap/Button";

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
            : "https://umbc.meyerandassoc.com/wp-content/themes/meyer_underscore_with_bootstrap_child/src/assets/images/no-featured-image.png"
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
                : "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png"
            }
            alt=""
          />
        </a>
      </div>
    </div>
  );
}

export default InfoTop;
