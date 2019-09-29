import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import "./ActorInfo.sass";

import API from "../../API";
import Loader from "../Loader/Loader";
import ActorDetails from "./components/ActorDetails";
import ActorMovies from "./components/ActorMovies";

function ActorInfo({ user, match }) {
  const { id } = match.params;

  const [isMovie, setIsMovie] = useState(true);
  const [loading, setLoading] = useState(true);
  const [actorDetails, setActorDetails] = useState({
    actor: null,
    movies: null,
    shows: null,
    images: null
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const actor = await API.getActorDetails(id);
      const movies = await API.getActorMovies(id);
      const shows = await API.getActorShows(id);
      const images = await API.getActorImages(id);
      setActorDetails({ actor, movies, images, shows });
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  const { actor, movies, shows, images } = actorDetails;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="actor-info-container">
          <ActorDetails
            actor={actor}
            images={images}
            profileImage={actor.profile_path}
          />
          <div className="cast-select">
            <h4>{isMovie ? "MOVIES:" : "TV SHOWS:"}</h4>
            <Button
              onClick={() => setIsMovie(!isMovie)}
              size="sm"
              id="type-select-button"
            >
              {isMovie ? "TV SHOWS" : "MOVIES"}
            </Button>
          </div>
          <ActorMovies
            movies={movies}
            shows={shows}
            isMovie={isMovie}
            user={user}
          />
        </div>
      )}
    </div>
  );
}

export default ActorInfo;
