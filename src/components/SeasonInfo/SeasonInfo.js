import React, { useState, useEffect } from "react";
import API from "../../API";
import "./SeasonInfo.sass";
import Loader from "../Loader/Loader";

function SeasonInfo(props) {
  const { showId, seasonId } = props.match.params;
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getSeason = async () => {
      const seasonDetails = await API.getShowSeason(showId, seasonId);
      setSeasonDetails(seasonDetails);
      setLoading(false);
    };
    getSeason();
  }, [showId, seasonId]);

  return (
    <div className="season-info-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <ul className="season-info-list">
            {seasonDetails.episodes.map(
              ({
                id,
                episode_number,
                name,
                still_path,
                overview,
                air_date
              }) => (
                <li key={id} className="episode-container">
                  <div className="episode-image">
                    {episode_number} - {name} - ({air_date})
                  </div>
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${still_path}`}
                      alt=""
                    />
                  </div>
                  <p>{overview}</p>
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default SeasonInfo;
