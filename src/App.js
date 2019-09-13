import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.sass";

import API from "./API";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import MoviesList from "./components/MoviesList/MoviesList";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import ShowInfo from "./components/ShowInfo/ShowInfo";
import UserLoginNew from "./components/UserLoginNew/UserLoginNew";
import UserSignupNew from "./components/UserSignupNew/UserSignupNew";
import CollectionList from "./components/CollectionList/CollectionList";
import ActorInfo from "./components/ActorInfo/ActorInfo";
import SeasonInfo from "./components/SeasonInfo/SeasonInfo";

function App(props) {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [page, setPage] = useState(2);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(
    () => (token ? (getCurrentUser(token), getUserMovies(token)) : undefined),
    [token]
  );

  useEffect(() => {
    API.getMovies(1).then(movies => setMovies(movies));
    API.getShows(1).then(shows => setShows(shows));
  }, []);

  const getCurrentUser = token => {
    API.getCurrentUser(token).then(user => setUser(user));
  };

  const getUserMovies = token => {
    API.getUserMovies(token).then(userMovies => setUserMovies(userMovies));
  };

  const handleLogout = () => {
    localStorage.clear("token");
    setUser({ user: null });
  };

  const getMovies = page => {
    API.getMovies(page)
      .then(newMovies => setMovies([...movies, ...newMovies]))
      .then(setPage(page + 1));
  };

  const getMoreMovies = () => {
    getMovies(page);
  };

  const getShows = page => {
    API.getShows(page)
      .then(newShows => setShows([...shows, ...newShows]))
      .then(setPage(page + 1));
  };

  const getMoreShows = () => {
    getShows(page);
  };

  const handleSearch = event => {
    event.preventDefault();
    API.searchMovie(searchTerm).then(movies => setSearchResults(movies));
    props.history.push({
      pathname: "/search",
      search: `?name=${searchTerm}`
    });
  };

  return (
    <div className="App">
      <NavBar
        props={props}
        user={user}
        handleLogout={handleLogout}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <div className="show-container">
        <Switch>
          <Route path="/home" exact component={LandingPage} />
          <Route
            path="/movies"
            exact
            render={props => (
              <MoviesList
                {...props}
                movies={movies}
                getMoreMovies={getMoreMovies}
              />
            )}
          />
          <Route
            path="/shows"
            exact
            render={props => (
              <MoviesList
                {...props}
                shows={shows}
                getMoreShows={getMoreShows}
              />
            )}
          />
          <Route
            path="/collection"
            exact
            render={props => <CollectionList {...props} movies={userMovies} />}
          />
          <Route path="/movies/:id" component={MovieInfo} />
          <Route
            path="/search"
            exact
            render={props => <MoviesList {...props} movies={searchResults} />}
          />
          <Route path="/shows/:id" exact component={ShowInfo} />
          <Route path="/shows/:id/season/:id" exact component={SeasonInfo} />
          <Route
            exact
            path="/login"
            render={props => (
              <UserLoginNew {...props} getCurrentUser={getCurrentUser} />
            )}
          />
          <Route
            exact
            path="/signup"
            render={props => (
              <UserSignupNew {...props} getCurrentUser={getCurrentUser} />
            )}
          />
          <Route path="/actors/:id" component={ActorInfo} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
