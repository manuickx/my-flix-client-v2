import React, { useState } from "react";

function ActorImages({ actor, images, profileImage }) {
  const [selectedImage, setSelectedImage] = useState(profileImage);

  const handleSelection = image => {
    setSelectedImage(image.file_path);
  };

  return (
    <div className="actor-images">
      <div className="profile-image-container">
        <img
          className="profile-image"
          src={
            profileImage
              ? `https://image.tmdb.org/t/p/w500${selectedImage}`
              : "https://www.ekcreditunion.co.uk/wp-content/uploads/2018/02/Blank-Silhouette.jpg"
          }
          alt=""
        />
        <div className="actor-images-container">
          {images.profiles.map(image => (
            <div className="small-image-container">
              <img
                onClick={() => handleSelection(image)}
                src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
      <div className="actor-details">
        <h1>{actor.name}</h1>
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
      </div>
    </div>
  );
}

export default ActorImages;
