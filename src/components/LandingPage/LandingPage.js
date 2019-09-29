import React from "react";

import "./LandingPage.sass";

import image from "../../assets/wp1945897-movie-posters-wallpapers.jpg";

function LandingPage() {
  return (
    <div>
      <div className="image-holder">
        <img className="landing-image" src={image} alt="" />
        <div className="logo-big">myFlixDb</div>
        <div className="cross-line"></div>
        <div className="footer">
          myFlixDb 2019 © Manu Ticusan and Alex Bujenita
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
