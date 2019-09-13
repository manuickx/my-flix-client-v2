import React, { useState, useEffect } from "react";
import API from "../../API";
import InfoTop from "../MovieInfo/components/InfoTop";
import InfoTrailer from "../MovieInfo/components/InfoTrailer";

function ShowInfo(props) {
  const { id } = props.match.params;

  const [showData, setShowData] = useState({
    show: null,
    show_trailer: null,
    seasons: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const show = await API.getOneShow(id);
      const seasons = await Array.from(Array(show.number_of_seasons).keys());
      const show_trailers = await API.getShowTrailers(id);
      const show_trailer = await show_trailers.find(
        trail => trail.type === "Trailer"
      );
      setShowData({ show, show_trailer, seasons });
    };
    fetchData();
  }, [id]);

  const { show, show_trailer, seasons } = showData;

  if (show === null || show_trailer === null) {
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
    const { name, overview, first_air_date, last_air_date } = show;
    return (
      <div className="info-details-container">
        {seasons.map(season => (
          <a href={`/shows/${id}/season/${season}`}>{season}</a>
        ))}
        <InfoTop movie={show} />
        <div className="info-overview">
          <h2>
            {name} ({first_air_date.substr(0, 4)} -{" "}
            {!show.in_production ? last_air_date.substr(0, 4) : null})
          </h2>
          <p>{overview}</p>
        </div>
        <div>SEASONS {seasons}</div>
        {show_trailer ? <InfoTrailer trailer={show_trailer} /> : null}
      </div>
    );
  }
}

export default ShowInfo;
