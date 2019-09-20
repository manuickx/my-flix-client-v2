import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import API from "../../API";
import Loader from "../Loader/Loader";

function SearchList({ location }) {
  let type = location.pathname.includes("movies") ? "movie" : "tv";
  const searchTerm = location.search.split("=")[1];
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSearch = async () => {
      const movies1 = await API.searchMovie(searchTerm, type, 1);
      const movies2 = await API.searchMovie(searchTerm, type, 2);
      const movies3 = await API.searchMovie(searchTerm, type, 3);
      const movies4 = await API.searchMovie(searchTerm, type, 4);
      const movies5 = await API.searchMovie(searchTerm, type, 5);
      setSearchResults([
        ...movies1,
        ...movies2,
        ...movies3,
        ...movies4,
        ...movies5
      ]);
      setLoading(false);
    };
    handleSearch();
  }, [searchTerm, type]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : searchResults.length === 0 ? (
        <h1>NO RESULTS</h1>
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
