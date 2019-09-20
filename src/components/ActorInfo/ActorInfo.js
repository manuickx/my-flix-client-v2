import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ActorInfo.sass";
import API from "../../API";
import Loader from "../Loader/Loader";
import ActorImages from "./components/ActorImages";

function ActorInfo(props) {
  const { id } = props.match.params;

  const [loading, setLoading] = useState(true);
  const [actorDetails, setActorDetails] = useState({
    actor: null,
    movies: null,
    images: null
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const actor = await API.getActorDetails(id);
      const movies = await API.getActorMovies(id);
      const images = await API.getActorImages(id);
      setActorDetails({ actor, movies, images });
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  const { actor, movies, images } = actorDetails;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="actor-info-container">
          <ActorImages
            actor={actor}
            images={images}
            profileImage={actor.profile_path}
          />
          {/* <h1>{actor.name}</h1>
          <h5>
            <a
              href={`https://www.imdb.com/name/${actor.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              IMDB
            </a>
          </h5>
          <h5>date of birth: {actor.birthday}</h5>
          {actor.deathday && <h5>date of death: {actor.deathday}</h5>}
          <h5>place of birth: {actor.place_of_birth}</h5>
          <h5>Bio:</h5>
          <p>{actor.biography}</p>
          <div>
            <ul className="actor-movies">
              {movies.cast
                .filter(movie => isNaN(movie.release_date))
                .sort(
                  (a, b) =>
                    Date.parse(b.release_date) - Date.parse(a.release_date)
                )
                .map(movie => (
                  <li key={movie.id}>
                    <Link key={movie.id} to={`/movies/${movie.id}`}>
                      <img
                        className="actor-image"
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "http://unityfresh.com/images/image-not-available.png"
                        }
                        alt=""
                      />
                      {movie.title} (
                      {movie.release_date && movie.release_date.substring(0, 4)}
                      )
                    </Link>
                  </li>
                ))}
            </ul>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default ActorInfo;
