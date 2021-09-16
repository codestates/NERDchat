import React from "react";
import NavItem from "./NavItem";

import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <h1 className="navbar-logo">NERDchat</h1>
        <NavItem />
      </ul>
    </nav>
  );
};

export default NavBar;
