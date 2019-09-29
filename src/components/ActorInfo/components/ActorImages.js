import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import noImage from "../../../assets/Blank-Silhouette.jpg";

function ActorImages({ actor, images, profileImage }) {
  const [selectedImage, setSelectedImage] = useState(profileImage);

  const handleSelection = image => {
    setSelectedImage(image.file_path);
  };

  return (
    <div className="actor-details-container">
      <div className="actor-images">
        <div className="actor-profile-image">
          <a
            href={`https://image.tmdb.org/t/p/w500${selectedImage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={
                selectedImage
                  ? `https://image.tmdb.org/t/p/w500${selectedImage}`
                  : `${noImage}`
              }
              alt=""
            />
          </a>
        </div>
        <div className="actor-profile-details">
          <div className="actor-name-container">
            <h1>{actor.name}</h1>
          </div>

          <ButtonToolbar className="external-links">
            {actor.imdb_id && (
              <Button
                href={`https://www.imdb.com/name/${actor.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-primary"
                size="sm"
                id="external-link"
              >
                <h5>IMDB</h5>
              </Button>
            )}
            {actor.homepage && (
              <Button
                href={actor.homepage}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="outline-primary"
                id="external-link"
              >
                <h5>HOMEPAGE</h5>
              </Button>
            )}
          </ButtonToolbar>
          {actor.birthday && (
            <>
              <h5>Born: {actor.birthday},</h5>
              <h5>in: {actor.place_of_birth}</h5>
            </>
          )}
          {actor.deathday && (
            <h5>
              Died: {actor.deathday} (age{" "}
              {actor.deathday.substring(5, 7) > actor.birthday.substring(5, 7)
                ? actor.deathday.substring(0, 4) -
                  actor.birthday.substring(0, 4)
                : actor.deathday.substring(9, 11) >=
                  actor.birthday.substring(9, 11)
                ? actor.deathday.substring(0, 4) -
                  actor.birthday.substring(0, 4)
                : actor.deathday.substring(0, 4) -
                  actor.birthday.substring(0, 4) -
                  1}
              )
            </h5>
          )}
          <div className="actor-bio-container">
            <h5>BIO:</h5>
            <p>{actor.biography}</p>
          </div>
        </div>
      </div>
      {images.profiles.length > 1 && (
        <div className="actor-images-container">
          {images.profiles.map(image => (
            <img
              key={image.file_path}
              onClick={() => handleSelection(image)}
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt=""
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ActorImages;
