import React from "react";

import video from "../../assets/nopass.mp4";

import "./MustBeLoggedIn.sass";

function MustBeLoggedIn({ history }) {
  return (
    <div className="not-allowed">
      <video autoPlay muted loop id="not-allowed-video">
        <source src={video} type="video/mp4"></source>
      </video>
      <h1>YOU HAVE NO ACCESS TO THIS PAGE</h1>
      <button onClick={() => history.goBack()}>GO BACK</button>
    </div>
  );
}

export default MustBeLoggedIn;
