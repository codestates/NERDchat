<<<<<<< HEAD
import React, { useState } from 'react';
import { AiOutlineBars, AiOutlineSearch, AiOutlineEnter } from 'react-icons/ai';
import { ReactComponent as Glasses } from '../../images/glasses.svg';

import './_NavBar.scss';
=======
import React from "react";
import NavItem from "./NavItem";
// import { ReactComponent as Glasses } from "../../images/glasses.svg";

import "./NavBar.scss";
>>>>>>> 696a80db2f8c46a0e63f6096e3ae7003cdb0a913

const NavBar = () => {
  return (
<<<<<<< HEAD
    <div className='nav_wrapper'>
      <nav>
        <input type='checkbox' id='show-search' />
        <input type='checkbox' id='show-menu' />
        <label htmlFor='show-menu' className='nav_menuIcon'>
          <AiOutlineBars size={20} />
        </label>
        <div className='nav_content'>
          <div className='nav_logo'>
            <a href='/'>
              <Glasses width='150' height='150' />
            </a>
          </div>
          <ul className='nav_links'>
            <li>
              <a href='/'>SERVER</a>
            </li>
            <li>
              <a href='/'>BOOKMARK</a>
              <ul>
                <li>
                  <a href='/'>Drop Menu 1</a>
                </li>
                <li>
                  <a href='/'>Drop Menu 2</a>
                </li>
                <li>
                  <a href='/'>Drop Menu 3</a>
                </li>
                <li>
                  <a href='/'>Drop Menu 4</a>
                </li>
                <li>
                  <a href='/'>Drop Menu 5</a>
                </li>
              </ul>
            </li>
            <li>
              <a href='/'>LOGIN</a>
            </li>
            <li>
              <a href='/'>SIGN IN</a>
            </li>
          </ul>
        </div>
        <label htmlFor='show-search' className='nav_searchIcon'>
          <AiOutlineSearch size={20} />
        </label>
        <form action='/' className='nav_searchBox'>
          <input type='text' placeholder='Something to Search...' required />
          <button type='submit' className='nav_goIcon'>
            <AiOutlineEnter size={20} />
          </button>
        </form>
      </nav>
    </div>
=======
    <nav className="navbar">
      <ul className="navbar-nav">
        {/* <Glasses width="100" height="100" className="navbar-logo" /> */}
        <h1 className="navbar-logo">NERDchat</h1>
        <NavItem />
      </ul>
    </nav>
>>>>>>> 696a80db2f8c46a0e63f6096e3ae7003cdb0a913
  );
};

export default NavBar;
