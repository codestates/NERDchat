import React, { useState } from 'react';
import { AiOutlineBars, AiOutlineSearch, AiOutlineEnter } from 'react-icons/ai';
import { ReactComponent as Glasses } from '../../images/glasses.svg';
import './_NavBar.scss';

const NavBar = () => {
  return (
    <div className='nav'>
      <nav className='nav_bar'>
        <label htmlFor='nav_showmenu' className='nav_menu'>
          <AiOutlineBars size={25} />
        </label>
        <input type='checkbox' id='nav_showmenu' />
        <div className='nav_container'>
          <div className='nav_logo'>
            <a href='/'>
              <Glasses width='110' height='110' />
            </a>
            {/* <span>NERDchat</span> */}
          </div>
          <ul className='nav_links'>
            <li>
              <a href='/'>SERVER</a>
            </li>
            <li>
              <a href='/'>LOGIN</a>
            </li>
            <li>
              <a href='/'>BOOKMARK</a>
            </li>
            <li>
              <a href='/'>SIGN UP</a>
            </li>
          </ul>
        </div>
        <input type='checkbox' id='nav_showsearch' />
        <label htmlFor='nav_showsearch' className='nav_search'>
          <AiOutlineSearch size={25} />
        </label>
        <form className='nav_searchbox'>
          <input type='text' placeholder='Search the server' required />
          <button type='submit' className='nav_enter'>
            <AiOutlineEnter size={25} className='nav_i_enter' />
          </button>
        </form>
      </nav>
    </div>
  );
};

export default NavBar;
