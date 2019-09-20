import React from "react";
import "./Loader.sass";

function Loader({ list }) {
  return (
    <div className="loader" style={list ? { marginTop: "1%" } : null}>
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
}

export default Loader;
