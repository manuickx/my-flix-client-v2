import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import API from "../../API";
import MovieCard from "../MovieCard/MovieCard";

function CollectionList() {
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
    <div className="movies-list">
      {favs.map(fav =>
        fav.item_type === "movie" ? (
          <Link key={fav.movie_ref_id} to={`/movies/${fav.movie_ref_id}`}>
            <MovieCard movie={fav} />
          </Link>
        ) : (
          <Link key={fav.movie_ref_id} to={`/shows/${fav.movie_ref_id}`}>
            <MovieCard movie={fav} />
          </Link>
        )
      )}
    </div>
  );
}

export default CollectionList;
