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

function App() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [userMovies, setUserMovies] = useState([]);

  useEffect(
    () =>
      token ? (getCurrentUser(token), getUserFavourites(token)) : undefined,
    []
  );
  useEffect(() => getMovies(page), []);
  useEffect(() => getShows(page), []);

  const getCurrentUser = token => {
    API.getCurrentUser(token).then(user => setUser(user));
  };

  const getUserFavourites = token => {
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

  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout} />
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
            path="/movies/:id"
            render={props => <MovieInfo {...props} userMovies={userMovies} />}
          />
          <Route path="/shows/:id" exact component={ShowInfo} />
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
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
