import React from "react";
import { ReactComponent as Sec } from "../../images/SVG/streamline-icon-video-conference@250x250.svg";

import "./HeroSecond.scss";

const HeroSecond = () => {
  return (
    <div>
      <div className="herosec-container">
        <div className="herosec-logoimage">
          <Sec width="680" height="680" />
        </div>
      </div>
    </div>
  );
};

export default HeroSecond;
