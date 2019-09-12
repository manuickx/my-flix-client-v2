import React, { useState, useEffect } from "react";
import API from "../../API";

import "./MovieInfo.sass";

import InfoRecommended from "./components/InfoRecommended";
import InfoTop from "./components/InfoTop";
import InfoTrailer from "./components/InfoTrailer";
import InfoCast from "./components/InfoCast";

function MovieInfo(props) {
  const { id } = props.match.params;
  const token = localStorage.getItem("token");
  const [inCollection, setInCollection] = useState(
    props.userMovies.find(movie => movie.movie_ref_id.toString() === id)
      ? true
      : false
  );

  const [movieData, setMovieData] = useState({
    movie: null,
    cast: null,
    trailer: null,
    recommended: null
  });

  const addMovieToCollection = () => {
    API.addMovieToCollection(movie, token).then(setInCollection(true));
  };

  const removeMovieFromCollection = () => {
    API.removeMovieFromCollection(movie, token).then(setInCollection(false));
  };

  useEffect(() => {
    const fetchData = async () => {
      const movie = await API.getOneMovie(id);
      const cast = await API.getMovieCredits(id);
      const trailers = await API.getMovieTrailers(id);
      const trailer = await trailers.find(trail => trail.type === "Trailer");
      const recommended = await API.getMovieRecommendations(id);
      setMovieData({ movie, cast, trailer, recommended });
    };
    fetchData();
  }, []);

  const { movie, cast, trailer, recommended } = movieData;

  if (
    movie === null ||
    cast === null ||
    trailer === null ||
    recommended === null
  ) {
    return (
      <div className="loader">
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
    );
  } else {
    const { title, overview } = movie;

    return (
      <div className="info-details-container">
        {inCollection ? (
          <button onClick={removeMovieFromCollection}>NO COLLECTION</button>
        ) : (
          <button onClick={addMovieToCollection}>COLLECTION</button>
        )}
        <InfoTop movie={movie} />
        <div className="info-overview">
          <h2>
            {title} ({movie.release_date.substring(0, 4)})
          </h2>
          <p>{overview}</p>
        </div>
        <h2 className="section-title">TRAILER:</h2>
        <InfoTrailer trailer={trailer} />
        {recommended.length > 0 ? (
          <>
            <h2 className="section-title">RECOMMENDED MOVIES:</h2>
            <InfoRecommended recommended={recommended} />
          </>
        ) : null}
        <h2 className="section-title">CAST:</h2>
        <InfoCast cast={cast} />
      </div>
    );
  }
}

export default MovieInfo;
