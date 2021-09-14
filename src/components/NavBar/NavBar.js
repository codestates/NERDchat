import React from "react";
import NavItem from "./NavItem";
// import { ReactComponent as Glasses } from "../../images/glasses.svg";

import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {/* <Glasses width="100" height="100" className="navbar-logo" /> */}
        <h1 className="navbar-logo">NERDchat</h1>
        <NavItem />
      </ul>
    </nav>
  );
};

export default NavBar;
