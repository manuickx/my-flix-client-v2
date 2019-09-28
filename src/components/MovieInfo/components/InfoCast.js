import React from "react";
import { Link } from "react-router-dom";
import silhouette from "../../../assets/Blank-Silhouette.jpg";

function InfoCast({ cast }) {
  return (
    <div className="movie-cast">
      {cast &&
        cast.map(actor => (
          <div className="actor-char-info" key={actor.id}>
            <Link to={`/actors/${actor.id}`}>
              <img
                className="actor-image"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : `${silhouette}`
                }
                alt=""
              />
            </Link>
            <div>
              <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
              <p> ... {actor.character}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default InfoCast;
