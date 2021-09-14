import React, { useState } from 'react';
import { AiOutlineBars, AiOutlineSearch, AiOutlineEnter } from 'react-icons/ai';
import { ReactComponent as Glasses } from '../../images/glasses.svg';

import './_NavBar.scss';

const NavBar = () => {
  // const [checked, setChecked] = useState(false);

  // const clickHandler = () => {
  //   setChecked((prev) => !prev);
  // };
  return (
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
  );
};

export default NavBar;
