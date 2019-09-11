import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.sass";

import API from "./API";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import MoviesList from "./components/MoviesList/MoviesList";
import MovieInfo from "./components/MovieInfo/MovieInfo";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => getMovies(page), []);

  const getMovies = page => {
    API.getMovies(page)
      .then(newMovies => setMovies([...movies, ...newMovies]))
      .then(setPage(page + 1));
  };

  const getMoreMovies = () => {
    getMovies(page);
  };

  return (
    <div className="App">
      <NavBar />
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
          <Route path="/movies/:id" component={MovieInfo} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
