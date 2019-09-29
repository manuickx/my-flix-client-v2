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
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App(props) {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Movies");
  const [adult, setAdult] = useState(false);

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
  };

  const handleSearchType = event => {
    event.preventDefault();
    setSearchType(event.target.innerHTML);
  };

  const handleSearch = event => {
    event.preventDefault();
    props.history.push({
      pathname: searchType === "Movies" ? "/search/movies" : "/search/shows",
      search: `?name=${searchTerm}&adult=${adult}`
    });
  };

  const handleAdult = () => {
    setAdult(!adult);
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
        searchType={searchType}
        handleSearchType={handleSearchType}
        adult={adult}
        handleAdult={handleAdult}
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
            path="/profile"
            exact
            render={props => <ProfilePage {...props} user={user} />}
          />
          <Route
            path="/collection"
            exact
            render={props => <CollectionList {...props} />}
          />
          <Route
            path="/movies/:movieId"
            exact
            render={props => <MovieInfo {...props} user={user} />}
          />
          <Route
            path="/search/movies"
            exact
            render={props => <SearchList {...props} user={user} />}
          />
          <Route
            path="/search/shows"
            exact
            render={props => <SearchList {...props} user={user} />}
          />
          <Route path="/shows/:showId" exact component={MovieInfo} />
          <Route
            path="/shows/:showId/season/:seasonId"
            exact
            component={SeasonInfo}
          />
          <Route
            path="/actors/:id"
            exact
            render={props => <ActorInfo {...props} user={user} />}
          />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
