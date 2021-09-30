import React, { useState, useContext, useEffect, useRef } from "react";
import {
  IoGameControllerOutline,
  IoBookOutline,
  IoFingerPrintOutline,
  IoConstructOutline,
} from "react-icons/io5";
import { useHistory } from "react-router-dom";
import "./NavItem.scss";
import DropdownMenu from "./DropdownMenu";
import Login from "../../components/login/Login";
import Logout from "../logout/Logout";
import { Context } from "../../context/ContextProvider";

const NavItem = () => {
  const history = useHistory();
  // const dropEl = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const {
    loginModalOpen,
    loginmodalHandler,
    logoutModalOpen,
    logoutModalHandler,
  } = useContext(Context);
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(!open);
  };

  const mypageHandler = () => {
    if (!localStorage.getItem("nerd-logged-in")) {
      loginmodalHandler();
      return;
    }
    const path = `/mypage`;
    history.push(path);
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem("nerd-logged-in"));
  }, [localStorage.getItem("nerd-logged-in")]);

  return (
    <>
      {loginModalOpen && <Login />}
      {logoutModalOpen && <Logout />}
      <li className="nav-item">
        <a href="/servers" className="icon-button">
          <IoGameControllerOutline size={30} />
        </a>
        <a className="icon-button" onClick={openHandler}>
          <IoBookOutline size={30} />
        </a>
        {/* {open && <DropdownMenu />} */}
        {!isLogin && (
          <a className="icon-button" onClick={loginmodalHandler}>
            <IoFingerPrintOutline size={30} />
          </a>
        )}
        {isLogin && (
          <a
            className="icon-button logged--icon--button"
            onClick={logoutModalHandler}
          >
            <IoFingerPrintOutline size={30} />
          </a>
        )}
        <div className="icon-button" onClick={mypageHandler}>
          <IoConstructOutline size={30} />
        </div>
      </li>
    </>
  );
};

export default NavItem;
