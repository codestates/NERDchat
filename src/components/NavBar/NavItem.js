import React, { useState } from 'react';
import {
  IoGameControllerOutline,
  IoBookOutline,
  IoFingerPrintOutline,
  IoConstructOutline
} from 'react-icons/io5';

import './NavItem.scss';
import DropdownMenu from './DropdownMenu';

const NavItem = () => {
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(!open);
  };
  return (
    <li className='nav-item'>
      <a href='/' className='icon-button'>
        <IoGameControllerOutline size={25} />
      </a>
      <a href='#' className='icon-button' onClick={openHandler}>
        <IoBookOutline size={25} />
      </a>
      {open && <DropdownMenu />}
      <a href='/' className='icon-button'>
        <IoFingerPrintOutline size={25} />
      </a>
      <a href='/' className='icon-button'>
        <IoConstructOutline size={25} />
      </a>
    </li>
  );
};

export default NavItem;
