import React, { useState, useEffect } from "react";
import API from "../../API";
import "./ProfilePage.sass";
import MustBeLoggedIn from "../MustBeLoggedIn/MustBeLoggedIn";

function ProfilePage({ user, history }) {
  const token = localStorage.getItem("token");
  let movies = null;
  let shows = null;

  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const getFavs = async () => {
      const favs = token && (await API.getUserMovies(token));
      setFavs(favs);
    };
    getFavs();
  }, [token]);

  if (token) {
    shows = favs.filter(fav => fav.item_type === "tv");
    movies = favs.filter(fav => fav.item_type === "movie");
  }

  return (
    <div>
      {token ? (
        <div className="profile-container">
          <img
            id="profile-background-image"
            src="https://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/mcu-1-iron-man.jpg?itok=3BqCURHK"
            alt=""
          />
          <div className="profile-card-container">
            <div className="profile-image-container">
              <img
                src="https://img1.looper.com/img/gallery/audi-may-have-spoiled-who-saves-tony-stark-in-avengers-4/intro-1547480934.jpg"
                alt=""
              />
            </div>
            <a href="/collection" id="collection-button">
              Collection
            </a>
            <a href="/profile/edit" id="edit-profile-button">
              Edit profile
            </a>
            <div className="profile-details-container">
              <h1 className="info-title">Name:</h1>{" "}
              <h1 className="info-value">{user && user.name.toUpperCase()}</h1>{" "}
              <h1 className="info-title">Email: </h1>
              <h1 className="info-value">{user && user.email}</h1>
              <h1 className="info-title">Movies:</h1>
              <h1 className="info-value">{movies.length}</h1>
              <h1 className="info-title">Tv Shows:</h1>
              <h1 className="info-value">{shows.length}</h1>
            </div>
          </div>
        </div>
      ) : (
        <MustBeLoggedIn history={history} />
      )}
    </div>
  );
}

export default ProfilePage;
