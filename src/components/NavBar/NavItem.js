import React, { useState, useContext, useEffect, useRef } from "react";
import {
  IoGameControllerOutline,
  IoBookOutline,
  IoFingerPrintOutline,
  IoConstructOutline,
} from "react-icons/io5";

import "./NavItem.scss";
import DropdownMenu from "./DropdownMenu";
import Login from "../../components/login/Login";
import { Context } from "../../context/ContextProvider";

const NavItem = () => {
  // const dropEl = useRef();
  const { loginModalOpen, loginmodalHandler, isLogin } = useContext(Context);
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(!open);
  };

  // const backgroundCloseHandler = (e) => {
  //   if (dropEl.current === e.target) {
  //     openHandler();
  //   }
  // };
  // const closeButtonHandler = (event) => {
  //   openHandler();
  // };

  return (
    <>
      {loginModalOpen && <Login />}
      <li className="nav-item">
        <a href="/servers" className="icon-button">
          <IoGameControllerOutline size={30} />
        </a>
        <a className="icon-button" onClick={openHandler}>
          <IoBookOutline size={30} />
        </a>
        {/* {open && <DropdownMenu />} */}
        <a className="icon-button" onClick={loginmodalHandler}>
          <IoFingerPrintOutline size={30} />
        </a>
        <a href="/mypage" className="icon-button">
          <IoConstructOutline size={30} />
        </a>
      </li>
    </>
  );
};

export default NavItem;
