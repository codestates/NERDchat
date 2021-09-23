import React from "react";
import { ReactComponent as Sec } from "../../images/SVG/streamline-icon-overworked-employee@250x250.svg";

import "./HeroSecond.scss";

const HeroSecond = () => {
  return (
    <div>
      <div className="herosec-container">
        <div className="herosec-logoimage">
          <Sec width="680" height="680" />
        </div>
        <div className="text-container">
          <div className="text-ani">
            <span className="first">M</span>
            <span className="first">E</span>
            <span className="first">E</span>
            <span className="first">T</span>
            <span className="slide">
              <h1 className="second-new">NEW</h1>
              <h1 className="second-fri">FRIENDS</h1>
            </span>
          </div>
          <div className="sub-text">
            <h1 className="sub-text-h1">
              Did you meet a new friend? enjoy the game with them. If you do it
              together, it will be more fun. Anything is possible on NerdChat.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSecond;
