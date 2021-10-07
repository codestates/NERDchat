import React, { useState, useContext, useEffect } from "react";
import {
  IoGameControllerOutline,
  IoBookOutline,
  IoFingerPrintOutline,
  IoConstructOutline,
  IoMenu,
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
  const [toggleOpen, setToggleOpen] = useState(false);

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
    setOpen(false);
  };
  const toggleHandler = () => {
    setToggleOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem("nerd-logged-in"));
  }, [loggedInCookie]);

  return (
    <>
      {loginModalOpen && <Login />}
      {logoutModalOpen && <Logout />}
      <div className="menu__container">
        <div className="toggle-btn" onClick={toggleHandler}>
          <IoMenu size={35} />
        </div>
        <li className={toggleOpen ? "nav-item open" : "nav-item"}>
          <Link
            to="/servers"
            className={toggleOpen ? "icon-button open" : "icon-button"}
          >
            <IoGameControllerOutline size={30} title="서버페이지로 이동" />
          </Link>
          <div
            className={toggleOpen ? "icon-button open" : "icon-button"}
            onClick={openHandler}
          >
            <IoBookOutline size={30} title="북마크" />
          </div>
          {open && (
            <DropdownMenu backgroundCloseHandler={backgroundCloseHandler} />
          )}
          {!isLogin && (
            <div
              className={toggleOpen ? "icon-button open" : "icon-button"}
              onClick={loginmodalHandler}
            >
              <IoFingerPrintOutline size={35} title="로그인" />
            </div>
          )}
          {isLogin && (
            <div
              className={
                toggleOpen
                  ? "icon-button logged--icon--button open"
                  : "icon-button logged--icon--button"
              }
              onClick={logoutModalHandler}
            >
              <IoFingerPrintOutline size={30} title="마이페이지" />
            </div>
          )}
          <div
            className={toggleOpen ? "icon-button open" : "icon-button"}
            onClick={mypageHandler}
          >
            <IoConstructOutline size={30} />
          </div>
        </li>
      </div>
    </>
  );
};

export default NavItem;
