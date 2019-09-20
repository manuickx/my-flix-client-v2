import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.sass";

import API from "./API";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import MoviesList from "./components/MoviesList/MoviesList";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import UserLoginNew from "./components/UserLoginNew/UserLoginNew";
import UserSignupNew from "./components/UserSignupNew/UserSignupNew";
import CollectionList from "./components/CollectionList/CollectionList";
import ActorInfo from "./components/ActorInfo/ActorInfo";
import SeasonInfo from "./components/SeasonInfo/SeasonInfo";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App(props) {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  let type;
  switch (props.location.pathname) {
    case "/movies":
      type = "movie";
      break;
    case "/search/movies":
      type = "movie";
      break;
    case "/shows":
      type = "tv";
      break;
    case "/search/shows":
      type = "tv";
      break;
    default:
      type = "";
  }

  useEffect(() => {
    const getUser = async () => {
      const user = token && (await API.getCurrentUser(token));
      setUser(user);
    };
    getUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear("token");
    setUser({ user: null });
    props.history.push("/home");
  };

  const handleSearch = event => {
    event.preventDefault();
    API.searchMovie(searchTerm, type, 1).then(movies =>
      setSearchResults(movies)
    );
    props.history.push({
      pathname:
        props.location.pathname === "/movies"
          ? "/search/movies"
          : "/search/shows",
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
          <Route path="/" exact component={LandingPage} />
          <Route
            exact
            path="/login"
            render={props => <UserLoginNew {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={props => <UserSignupNew {...props} />}
          />
          <Route
            path="/movies"
            exact
            render={props => (
              <MoviesList
                {...props}
                // items={items}
                type={type}
                // getMoreItems={getMoreItems}
              />
            )}
          />
          <Route
            path="/shows"
            exact
            render={props => (
              <MoviesList
                {...props}
                // items={items}
                type={type}
                // getMoreItems={getMoreItems}
              />
            )}
          />
          <Route
            path="/collection"
            exact
            render={props => (
              <CollectionList
                {...props}
                // favs={userFavs}
              />
            )}
          />
          <Route path="/movies/:movieId" exact component={MovieInfo} />
          <Route
            path="/search/movies"
            exact
            render={props => (
              <MoviesList {...props} items={searchResults} type={type} />
            )}
          />
          <Route
            path="/search/shows"
            exact
            render={props => <MoviesList {...props} items={searchResults} />}
          />
          <Route path="/shows/:showId" exact component={MovieInfo} />
          <Route
            path="/shows/:showId/season/:seasonId"
            exact
            component={SeasonInfo}
          />
          <Route path="/actors/:id" component={ActorInfo} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
