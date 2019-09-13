import React, { useState, useEffect } from "react";
import API from "../../API";

import "./MovieInfo.sass";

import InfoRecommended from "./components/InfoRecommended";
import InfoTop from "./components/InfoTop";
import InfoTrailer from "./components/InfoTrailer";
import InfoCast from "./components/InfoCast";

function MovieInfo({ match }) {
  const { id } = match.params;
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [inCollection, setInCollection] = useState(null);

  const [movieData, setMovieData] = useState({
    movie: null,
    cast: null,
    trailer: null,
    recommended: null,
    userMovies: null
  });

  const addMovieToCollection = () => {
    API.addMovieToCollection(movie, token);
    setInCollection(true);
  };

  const removeMovieFromCollection = () => {
    API.removeMovieFromCollection(movie, token);
    setInCollection(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const movie = await API.getOneMovie(id);
      const cast = await API.getMovieCredits(id);
      const trailers = await API.getMovieTrailers(id);
      const trailer = await trailers.find(trail => trail.type === "Trailer");
      const recommended = await API.getMovieRecommendations(id);
      const userMovies = token && (await API.getUserMovies(token));
      const inCollection =
        token &&
        (await userMovies.find(movie => movie.movie_ref_id.toString() === id))
          ? true
          : false;
      setMovieData({
        movie,
        cast,
        trailer,
        recommended,
        userMovies
      });
      setInCollection(inCollection);
      setLoading(false);
    };
    fetchData();
  }, [id, token]);

  const { movie, cast, trailer, recommended } = movieData;
  console.log(loading);

  return (
    <div>
      {loading ? (
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
      ) : (
        <div className="info-details-container">
          {inCollection
            ? token && (
                <button onClick={() => removeMovieFromCollection(movie)}>
                  NO COLLECTION
                </button>
              )
            : token && (
                <button onClick={() => addMovieToCollection(movie)}>
                  COLLECTION
                </button>
              )}
          <InfoTop movie={movie} />
          <div className="info-overview">
            <h2>
              {movie.title} ({movie.release_date.substring(0, 4)})
            </h2>
            <p>{movie.overview}</p>
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
      )}
    </div>
  );
}

export default MovieInfo;
