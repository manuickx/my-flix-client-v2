import React from "react";
import image from "../../assets/wp1945897-movie-posters-wallpapers.jpg";
import "./LandingPage.sass";

function LandingPage() {
  return (
    <div>
      <div className="image-holder">
        <img className="landing-image" src={image} alt=""></img>
      </div>
    </div>
  );
}

export default LandingPage;
