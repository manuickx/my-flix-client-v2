import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import API from "../../API";
import MovieCard from "../MovieCard/MovieCard";
import MustBeLoggedIn from "../MustBeLoggedIn/MustBeLoggedIn";

function CollectionList({ history }) {
  const token = localStorage.getItem("token");

  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const getFavs = async () => {
      const favs = token && (await API.getUserMovies(token));
      setFavs(favs);
    };
    getFavs();
  }, [token]);

  return (
    <div>
      {token ? (
        <div className="movies-list">
          {favs.map(fav => (
            <Link
              key={fav.movie_ref_id}
              to={
                fav.item_type === "movie"
                  ? `/movies/${fav.movie_ref_id}`
                  : `/shows/${fav.movie_ref_id}`
              }
            >
              <MovieCard movie={fav} />
            </Link>
          ))}
        </div>
      ) : (
        <MustBeLoggedIn history={history} />
      )}
    </div>
  );
}

export default CollectionList;
