import React from "react";
import YouTube from "react-youtube";

function InfoTrailer({ trailer }) {
  const opts = {
    // height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0
    }
  };

  return (
    <div className="trailer-container">
      <YouTube
        className="trailer-video"
        videoId={trailer ? trailer.key : "3cYBfuphkuE"}
        opts={opts}
      />
    </div>
  );
}

export default InfoTrailer;
