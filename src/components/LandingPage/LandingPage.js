import React from "react";
import image from "../../assets/wp1945897-movie-posters-wallpapers.jpg";
import "./LandingPage.sass";
import Image from "react-bootstrap/Image";

function LandingPage() {
  return (
    <div>
      <div className="image-holder">
        <Image className="landing-image" src={image} alt="" fluid />
        <div className="logo-big">MyFlix</div>
        <div className="cross-line"></div>
        <div className="footer">
          MyFlix 2019 © Manu Ticusan and Alex Bujenita
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
