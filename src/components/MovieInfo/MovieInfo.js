import React, { useState, useEffect } from "react";
import API from "../../API";

import "./MovieInfo.sass";

import InfoRecommended from "./components/InfoRecommended";
import InfoTop from "./components/InfoTop";
import InfoTrailer from "./components/InfoTrailer";
import InfoCast from "./components/InfoCast";
import PageNotFound from "../PageNotFound/PageNotFound";
import InfoOverview from "./components/InfoOverview";
import Loader from "../Loader/Loader";

function MovieInfo({ match }) {
  const id = match.params.movieId ? match.params.movieId : match.params.showId;
  const token = localStorage.getItem("token");
  const type = match.params.movieId ? "movie" : "tv";

  const [loading, setLoading] = useState(true);
  const [inCollection, setInCollection] = useState(null);

  const [itemData, setItemData] = useState({
    item: null,
    cast: null,
    trailer: null,
    recommended: null,
    userMovies: null,
    seasons: []
  });

  const addMovieToCollection = () => {
    API.addMovieToCollection(item, token);
    setInCollection(true);
  };

  const removeMovieFromCollection = () => {
    API.removeMovieFromCollection(item, token);
    setInCollection(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const item = await API.getOneItem(type, id);
      const seasons =
        type === "tv" &&
        (await Array.from(Array(item.number_of_seasons).keys()));
      const cast = await API.getCredits(type, id);
      const trailers = await API.getTrailers(type, id);
      const trailer =
        trailers && (await trailers.find(trail => trail.type === "Trailer"));
      const recommended = await API.getRecommendations(type, id);
      const userMovies = token && (await API.getUserMovies(token));
      const inCollection =
        token &&
        (await userMovies.find(movie => movie.movie_ref_id.toString() === id))
          ? true
          : false;
      setItemData({
        item,
        cast,
        trailer,
        recommended,
        userMovies,
        seasons
      });
      setInCollection(inCollection);
      setLoading(false);
    };
    fetchData();
  }, [type, id, token]);

  const { item, cast, trailer, recommended, seasons } = itemData;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : item.error ? (
        <PageNotFound />
      ) : (
        <div className="info-details-container">
          <InfoTop
            movie={item}
            removeMovieFromCollection={removeMovieFromCollection}
            addMovieToCollection={addMovieToCollection}
            inCollection={inCollection}
            token={token}
          />
          <InfoOverview item={item} type={type} />
          {/* {type === "tv" && (
            <>
              <h2 className="section-title">SEASONS:</h2>
              {seasons.map(season => (
                <a key={season + 1} href={`/shows/${id}/season/${season + 1}`}>
                  {season + 1}
                </a>
              ))}
            </>
          )} */}
          {trailer && (
            <>
              <h2 className="section-title">TRAILER:</h2>
              <InfoTrailer trailer={trailer} />
            </>
          )}
          {/* {recommended && (
            <>
              <h2 className="section-title">RECOMMENDED MOVIES:</h2>
              <InfoRecommended recommended={recommended} type={type} />
            </>
          )} */}
          {/* <h2 className="section-title">CAST:</h2>
          <InfoCast cast={cast} /> */}
        </div>
      )}
    </div>
  );
}

export default MovieInfo;
