import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ActorInfo.sass";
import API from "../../API";

function ActorInfo(props) {
  const { id } = props.match.params;

  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchActor = async () => {
      const actor = await API.getActorDetails(id);
      setActor(actor);
    };
    fetchActor();
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await API.getActorMovies(id);
      setMovies(movies);
    };
    fetchMovies();
  }, [id]);

  if (actor === null || movies === null) {
    return (
      <div className="loader">
        <div className="lds-roller" key={0}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : "https://www.ekcreditunion.co.uk/wp-content/uploads/2018/02/Blank-Silhouette.jpg"
          }
          alt=""
        />
        <h1>{actor.name}</h1>
        <h5>
          <a href={`https://www.imdb.com/name/${actor.imdb_id}`}>IMDB</a>
        </h5>
        <h5>date of birth: {actor.birthday}</h5>
        <h5>{actor.deathday ? actor.deathday : null}</h5>
        <h5>place of birth: {actor.place_of_birth}</h5>
        <h5>Bio:</h5>
        <p>{actor.biography}</p>
        <div>
          <ul className="actor-movies">
            {movies.cast
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
                    {movie.title} ({movie.release_date})
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ActorInfo;
