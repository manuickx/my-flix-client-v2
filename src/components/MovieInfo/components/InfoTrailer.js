import React from "react";
import YouTube from "react-youtube";

function InfoTrailer({ trailer }) {
  const opts = {
    height: "150",
    width: "245",
    playerVars: {
      autoplay: 0
    }
  };

  return (
    <div className="trailer-container">
      {trailer && (
        <YouTube className="trailer-video" videoId={trailer.key} opts={opts} />
      )}
    </div>
  );
}

export default InfoTrailer;
