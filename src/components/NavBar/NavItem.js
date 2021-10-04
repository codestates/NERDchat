import React, { useState, useContext, useEffect } from "react";
import {
  IoGameControllerOutline,
  IoBookOutline,
  IoFingerPrintOutline,
  IoConstructOutline,
} from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import "./NavItem.scss";
import Login from "../../components/login/Login";
import Logout from "../logout/Logout";
import DropdownMenu from "./DropdownMenu";
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
    setOpen((prev) => !prev);
  };

  const mypageHandler = () => {
    if (!localStorage.getItem("nerd-logged-in")) {
      loginmodalHandler();
      return;
    }
    const path = `/mypage`;
    history.push(path);
  };

  const loggedInCookie = localStorage.getItem("nerd-logged-in");
  const backgroundCloseHandler = (e) => {
    console.log(123123);
    setOpen(false);
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem("nerd-logged-in"));
  }, [loggedInCookie]);

  return (
    <>
      {loginModalOpen && <Login />}
      {logoutModalOpen && <Logout />}
      <li className="nav-item">
        <Link to="/servers" className="icon-button">
          <IoGameControllerOutline size={30} />
        </Link>
        <div className="icon-button" onClick={openHandler}>
          <IoBookOutline size={30} />
        </div>
        {open && (
          <DropdownMenu backgroundCloseHandler={backgroundCloseHandler} />
        )}
        {!isLogin && (
          <div className="icon-button" onClick={loginmodalHandler}>
            <IoFingerPrintOutline size={30} />
          </div>
        )}
        {isLogin && (
          <div
            className="icon-button logged--icon--button"
            onClick={logoutModalHandler}
          >
            <IoFingerPrintOutline size={30} />
          </div>
        )}
        <div className="icon-button" onClick={mypageHandler}>
          <IoConstructOutline size={30} />
        </div>
      </li>
    </>
  );
};

export default NavItem;
