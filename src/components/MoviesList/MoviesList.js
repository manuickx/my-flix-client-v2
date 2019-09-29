import React, { Component } from "react";
import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

import API from "../../API";

import "./MoviesList.sass";

import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";

class MoviesList extends Component {
  state = {
    page: 1,
    items: []
  };

  componentDidMount() {
    this.getItems(this.props.type, this.state.page);
  }

  getItems = (type, page) => {
    API.getItems(type, page).then(items =>
      this.setState({ items: [...this.state.items, ...items] })
    );
  };

  getMoreItems = () => {
    this.setState({ page: this.state.page + 1 });
    this.getItems(this.props.type, this.state.page);
  };

  render() {
    const { type, location } = this.props;
    const { items } = this.state;

    return (
      <div className="movies-container">
        <InfiniteScroll
          dataLength={items.length}
          next={this.getMoreItems}
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
}

export default MoviesList;
