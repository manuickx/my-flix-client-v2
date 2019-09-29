import React from "react";
import { Link } from "react-router-dom";
import silhouette from "../../../assets/Blank-Silhouette.jpg";

function InfoCast({ cast }) {
  return (
    <div className="movie-cast">
      {cast &&
        cast.map(({ id, name, character, profile_path }) => (
          <div className="actor-char-info" key={id}>
            <Link to={`/actors/${id}`}>
              <img
                className="actor-image"
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : `${silhouette}`
                }
                alt=""
              />
            </Link>
            <div>
              <Link to={`/actors/${id}`}>{name}</Link>
              <p> ... {character}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default InfoCast;
