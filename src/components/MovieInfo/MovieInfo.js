import React, { useState, useEffect } from "react";
import API from "../../API";

import "./MovieInfo.sass";

import InfoRecommended from "./components/InfoRecommended";
import InfoTop from "./components/InfoTop";
import InfoTrailer from "./components/InfoTrailer";
import InfoCast from "./components/InfoCast";

function MovieInfo(props) {
  const { id } = props.match.params;

  const [movieData, setMovieData] = useState({
    movie: null,
    cast: null,
    trailer: null,
    recommended: null
  });

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
    //   this.state.userMovies === null
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
    const { original_title, overview } = movie;

    return (
      <div className="info-details-container">
        <InfoTop movie={movie} />
        <div className="info-overview">
          <h2>
            {original_title} ({movie.release_date.substring(0, 4)})
          </h2>
          <p>{overview}</p>
        </div>
        <h2 className="section-title">TRAILER:</h2>
        <InfoTrailer trailer={trailer} />
        <h2 className="section-title">RECOMMENDED MOVIES:</h2>
        <InfoRecommended recommended={recommended} />
        <h2 className="section-title">CAST:</h2>
        <InfoCast cast={cast} />
      </div>
    );
  }
}

export default MovieInfo;
