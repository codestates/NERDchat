import React from 'react';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        <Link to='/'>
          <h1 className='navbar-logo'>NERDchat</h1>
        </Link>
        <NavItem />
      </ul>
    </nav>
  );
};

export default NavBar;
