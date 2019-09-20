import React from "react";

function InfoOverview({ item, type }) {
  return (
    <div>
      {type === "movie" ? (
        <h2 className="info-movie-title">
          {item.title}({item.release_date.substring(0, 4)})
        </h2>
      ) : (
        <h2 className="info-movie-title">
          {item.name}({item.first_air_date.substr(0, 4)} -{" "}
          {!item.in_production && item.last_air_date.substr(0, 4)})
        </h2>
      )}
      <p className="info-movie-overview">{item.overview}</p>
    </div>
  );
}
export default InfoOverview;
