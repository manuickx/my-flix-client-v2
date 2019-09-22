import React from "react";

function InfoOverview({ item, type }) {
  return (
    <div className="info-overview-container">
      {type === "movie" ? (
        <>
          <div className="info-movie-title">
            <p>{`${item.title}   (${item.release_date.substring(0, 4)})`}</p>
          </div>
        </>
      ) : (
        <div className="info-movie-title">
          <p>
            {`${item.name}   (${item.first_air_date.substr(0, 4)} -
            ${!item.in_production ? item.last_air_date.substr(0, 4) : ""})`}
          </p>
        </div>
      )}
      <p className="info-movie-overview">{item.overview}</p>
    </div>
  );
}
export default InfoOverview;
