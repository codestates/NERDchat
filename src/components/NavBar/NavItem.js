import React, { useState, useContext} from 'react';
import {
  IoGameControllerOutline,
  IoBookOutline,
  IoFingerPrintOutline,
  IoConstructOutline
} from 'react-icons/io5';

import './NavItem.scss';
import DropdownMenu from './DropdownMenu';
import Login from '../../components/login/Login'
import {Context} from '../../context/ContextProvider';

const NavItem = () => {
  const {loginModalOpen, loginmodalHandler, isLogin} = useContext(Context);
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(!open);
  };
  return (
    <>
    {loginModalOpen && <Login />}
    <li className='nav-item'>
      <a href='/' className='icon-button'>
        <IoGameControllerOutline size={25} />
      </a>
      <a href='#' className='icon-button' onClick={openHandler}>
        <IoBookOutline size={25} />
      </a>
      {open && <DropdownMenu />}
      <a className='icon-button' onClick={loginmodalHandler}>
        <IoFingerPrintOutline size={25} />
      </a>
      <a href='/' className='icon-button'>
        <IoConstructOutline size={25} />
      </a>
    </li>
    </>
  );
};

export default NavItem;
