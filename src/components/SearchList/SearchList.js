import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import API from "../../API";
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";
import NoSearchResults from "../NoSearchResults/NoSearchResults";

function SearchList({ location, history, user }) {
  let type = location.pathname.includes("movies") ? "movie" : "tv";
  let searchValid =
    location.search.substring(0, 6) === "?name=" &&
    location.search.substring(6).length !== 0
      ? true
      : false;
  const searchTerm = location.search.split("&adult")[0].split("?name=")[1];
  const adult =
    user && user.age > 17 ? location.search.split("&adult=")[1] : false;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSearch = async () => {
      setSearchResults([]);
      setLoading(true);
      let movies = [];
      if (searchValid) {
        for (let page = 1; page < 11; page++) {
          let moreMovies = await API.searchMovie(searchTerm, type, page, adult);
          movies = [...movies, ...moreMovies];
        }
      }
      setSearchResults(movies);
      setLoading(false);
    };
    handleSearch();
  }, [searchTerm, searchValid, type, adult]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : searchResults.length === 0 ? (
        <NoSearchResults history={history} />
      ) : (
        <div className="movies-list">
          {searchResults.map(item => (
            <Link
              key={item.id}
              to={
                type === "movie" || item.item_type === "movie"
                  ? `/movies/${item.id}`
                  : `/shows/${item.id}`
              }
            >
              <MovieCard movie={item} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchList;
