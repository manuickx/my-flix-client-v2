import React, { useState, useEffect } from "react";
import API from "../../API";
import InfoTop from "../MovieInfo/components/InfoTop";
import InfoTrailer from "../MovieInfo/components/InfoTrailer";
import PageNotFound from "../PageNotFound/PageNotFound";

function ShowInfo(props) {
  const { showId: id } = props.match.params;

  const [loading, setLoading] = useState(true);
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
      const show_trailer = show_trailers
        ? await show_trailers.find(
            trail => trail.type === "Trailer" || trail.type === "Teaser"
          )
        : null;
      setShowData({ show, show_trailer, seasons });
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const { show, show_trailer, seasons } = showData;

  return (
    <div>
      {loading ? (
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
      ) : show.error ? (
        <PageNotFound />
      ) : (
        <div className="info-details-container">
          {seasons.map(season => (
            <a href={`/shows/${id}/season/${season + 1}`}>{season + 1}</a>
          ))}
          <InfoTop movie={show} />
          <h2 className="info-movie-title">
            {show.name} ({show.first_air_date.substr(0, 4)} -{" "}
            {!show.in_production && show.last_air_date.substr(0, 4)})
          </h2>
          <p className="info-movie-overview">{show.overview}</p>
          {show_trailer && <InfoTrailer trailer={show_trailer} />}
        </div>
      )}
    </div>
  );
}

export default ShowInfo;
