import React from "react";
import { ReactComponent as Glasses } from "../../images/glasses.svg";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="mainfooter">
      <div className="footerlogo">
        <Glasses width="100" height="100" />
      </div>
    </div>
  );
};

export default Footer;
