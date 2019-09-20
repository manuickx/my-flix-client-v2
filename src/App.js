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
import SearchList from "./components/SearchList/SearchList";
import ActorInfo from "./components/ActorInfo/ActorInfo";
import SeasonInfo from "./components/SeasonInfo/SeasonInfo";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App(props) {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  let type = props.location.pathname.includes("movies") ? "movie" : "tv";

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
    props.history.push("/");
  };

  const handleSearch = async event => {
    event.preventDefault();
    props.history.push({
      pathname: props.location.pathname.includes("movies")
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
            render={props => <MoviesList {...props} type={type} />}
          />
          <Route
            path="/shows"
            exact
            render={props => <MoviesList {...props} type={type} />}
          />
          <Route
            path="/collection"
            exact
            render={props => <CollectionList {...props} />}
          />
          <Route path="/movies/:movieId" exact component={MovieInfo} />
          <Route path="/search/movies" exact component={SearchList} />} />
          <Route path="/search/shows" exact component={SearchList} />} />
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
