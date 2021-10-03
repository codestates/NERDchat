import React from "react";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <div className="dd">
      <nav className="navbar">
        <ul className="navbar-nav">
          <Link to="/">
            <h1 className="navbar-logo">NERDchat</h1>
          </Link>
          <NavItem />
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
