import React from "react";
import { ReactComponent as Third } from "../../images/SVG/streamline-icon-video-conference@250x250.svg";
import "./HeroThird.scss";

const HeroThird = () => {
  return (
    <div className="third-container">
      <div className="thirdtitle">
        <h2>Have fun</h2>
        <h1>together</h1>
        <div className="thirdsubtitle">
          <span>
            Nerd Chat provides a place to enjoy games with friends through
            general chat and voice chat. Experience it now. we hope you have an
            exciting time.
          </span>
        </div>
      </div>
      <div className="third-image">
        <Third width="680" height="680" />
      </div>
    </div>
  );
};

export default HeroThird;
