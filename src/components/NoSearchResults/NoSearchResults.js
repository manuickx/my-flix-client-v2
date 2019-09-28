import React from "react";

import video from "../../assets/notTheDroids.mp4";

import "./NoSearchResults.sass";

function NoSearchResults({ history }) {
  return (
    <div className="not-found">
      <video autoPlay muted loop id="not-found-video">
        <source src={video} type="video/mp4"></source>
      </video>
      <h1>THESE AREN'T THE DROIDS YOU'RE LOOKING FOR</h1>
      <button onClick={() => history.goBack()}>MOVE ALONG</button>
    </div>
  );
}

export default NoSearchResults;
