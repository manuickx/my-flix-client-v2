import React from "react";

function SeasonInfo(props) {
  return (
    <div>
      <h1>SEASON {props.match.params.id}</h1>
    </div>
  );
}

export default SeasonInfo;
