import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import API from "../../API";
import Loader from "../Loader/Loader";

function SearchList({ location }) {
  let type = location.pathname.includes("movies") ? "movie" : "tv";
  let searchValid =
    location.search.substring(0, 6) === "?name=" &&
    location.search.substring(6).length !== 0
      ? true
      : false;
  const searchTerm = location.search.substring(6);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSearch = async () => {
      const movies1 = searchValid
        ? await API.searchMovie(searchTerm, type, 1)
        : [];
      const movies2 = searchValid
        ? await API.searchMovie(searchTerm, type, 2)
        : [];
      const movies3 = searchValid
        ? await API.searchMovie(searchTerm, type, 3)
        : [];
      const movies4 = searchValid
        ? await API.searchMovie(searchTerm, type, 4)
        : [];
      const movies5 = searchValid
        ? await API.searchMovie(searchTerm, type, 5)
        : [];
      const movies6 = searchValid
        ? await API.searchMovie(searchTerm, type, 6)
        : [];
      const movies7 = searchValid
        ? await API.searchMovie(searchTerm, type, 7)
        : [];
      const movies8 = searchValid
        ? await API.searchMovie(searchTerm, type, 8)
        : [];
      const movies9 = searchValid
        ? await API.searchMovie(searchTerm, type, 9)
        : [];
      const movies10 = searchValid
        ? await API.searchMovie(searchTerm, type, 10)
        : [];
      setSearchResults([
        ...movies1,
        ...movies2,
        ...movies3,
        ...movies4,
        ...movies5,
        ...movies6,
        ...movies7,
        ...movies8,
        ...movies9,
        ...movies10
      ]);
      setLoading(false);
    };
    handleSearch();
  }, [searchTerm, searchValid, type]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : searchResults.length === 0 ? (
        <h2
          style={{
            position: "absolute",
            color: "white",
            top: "50%",
            left: "50%",
            transform: "translate(-50%)",
            fontSize: "2.5vw"
          }}
        >
          NO RESULTS, PLEASE TRY ANOTHER SEARCH
        </h2>
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
