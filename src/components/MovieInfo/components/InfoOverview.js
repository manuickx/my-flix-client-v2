import React from "react";

function InfoOverview({ item, type }) {
  const {
    title,
    name,
    release_date,
    first_air_date,
    last_air_date,
    in_production,
    overview
  } = item;

  const i_title = type === "movie" ? title : name;
  const date =
    type === "movie"
      ? release_date && release_date.substring(0, 4)
      : `${first_air_date && first_air_date.substr(0, 4)} - ${
          !in_production ? last_air_date.substr(0, 4) : ""
        }`;

  return (
    <div className="info-overview-container">
      <div className="info-movie-title">
        <p>{`${i_title}   (${date})`}</p>
      </div>
      <p className="info-movie-overview">{overview}</p>
    </div>
  );
}
export default InfoOverview;
