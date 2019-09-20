import React from "react";

import video from "../../assets/confused.mp4";

import "./PageNotFound.sass";

function PageNotFound() {
  return (
    <div className="not-found">
      <video autoPlay muted loop id="not-found-video">
        <source src={video} type="video/mp4"></source>
      </video>
      <h1>PAGE NOT FOUND</h1>
    </div>
  );
}

export default PageNotFound;
