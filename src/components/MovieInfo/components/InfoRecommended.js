import React, { useState } from "react";

function InfoRecommended({ recommended }) {
  const [selected, setSelected] = useState(recommended[0]);

  const selectMovie = movie => {
    setSelected(movie);
  };

  if (selected === null) {
    return <div>LOADING</div>;
  } else {
    return (
      <div className="info-recommended-movies">
        <div className="movies-grid">
          {recommended.slice(0, 6).map(rec => (
            <li key={rec.id}>
              <div className="rec-movie-container">
                <img
                  onMouseEnter={() => selectMovie(rec)}
                  src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                  alt=""
                />
              </div>
            </li>
          ))}
        </div>
        <div className="selected-rec-movie">
          <a href={selected ? `/movies/${selected.id}` : null}>
            <img
              src={`https://image.tmdb.org/t/p/w500${selected.poster_path}`}
              alt=""
            />
          </a>
          <h3>
            {selected.original_title} ({selected.release_date.substring(0, 4)})
          </h3>
        </div>
      </div>
    );
  }
}

export default InfoRecommended;
