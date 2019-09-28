import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import API from "../../API";
import Loader from "../Loader/Loader";
import NoSearchResults from "../NoSearchResults/NoSearchResults";

function SearchList({ location, history }) {
  console.log(location.search);
  let type = location.pathname.includes("movies") ? "movie" : "tv";
  let searchValid =
    location.search.substring(0, 6) === "?name=" &&
    location.search.substring(6).length !== 0
      ? true
      : false;
  const searchTerm = location.search.split("&adult")[0].split("?name=")[1];
  const adult = location.search.split("&adult=")[1];
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSearch = async () => {
      setSearchResults([]);
      setLoading(true);
      const movies1 = searchValid
        ? await API.searchMovie(searchTerm, type, 1, adult)
        : [];
      const movies2 = searchValid
        ? await API.searchMovie(searchTerm, type, 2, adult)
        : [];
      const movies3 = searchValid
        ? await API.searchMovie(searchTerm, type, 3, adult)
        : [];
      const movies4 = searchValid
        ? await API.searchMovie(searchTerm, type, 4, adult)
        : [];
      const movies5 = searchValid
        ? await API.searchMovie(searchTerm, type, 5, adult)
        : [];
      const movies6 = searchValid
        ? await API.searchMovie(searchTerm, type, 6, adult)
        : [];
      const movies7 = searchValid
        ? await API.searchMovie(searchTerm, type, 7, adult)
        : [];
      const movies8 = searchValid
        ? await API.searchMovie(searchTerm, type, 8, adult)
        : [];
      const movies9 = searchValid
        ? await API.searchMovie(searchTerm, type, 9, adult)
        : [];
      const movies10 = searchValid
        ? await API.searchMovie(searchTerm, type, 10, adult)
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
