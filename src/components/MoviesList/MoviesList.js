import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

import "./MoviesList.sass";

import API from "../../API";
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";

function MoviesList({ type, location }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    window.scrollTo(0, 0);
    API.getItems(type, 1).then(items => setItems(items));
  }, [type]);

  const getItems = () => {
    API.getItems(type, page)
      .then(newItems => setItems([...items, ...newItems]))
      .then(setPage(page + 1));
  };

  const getMoreItems = () => {
    getItems(type, page);
  };

  return (
    <div className="movies-container">
      <InfiniteScroll
        dataLength={items.length}
        next={getMoreItems}
        hasMore={location.pathname.includes("search") ? false : true}
        loader={<Loader list={true} />}
      >
        <div className="movies-list">
          {items.map(item => (
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
      </InfiniteScroll>
    </div>
  );
}

export default MoviesList;
