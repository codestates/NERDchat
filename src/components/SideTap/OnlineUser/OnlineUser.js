import React, { useState, useRef } from "react";

import { IoChevronDownOutline, IoEllipseSharp } from "react-icons/io5";

import OnlineUserDropDown from "./DropDown/OnlineUserDropDown";

import "./OnlineUser.scss";

const OnlineUser = ({ avatar, nickname, messages }) => {
  const [userName, setUserName] = useState(nickname);
  const [loader, setLoader] = useState(false);
  const dropRef = useRef();

  const clickHandler = () => {
    setLoader((prev) => !prev);
  };

  const backgroundCloseHandler = (e) => {
    if (dropRef.current === e.target) {
      setLoader(false);
    }
  };

  return (
    <>
      <div
        className="online__container"
        ref={dropRef}
        onClick={backgroundCloseHandler}
      >
        <div className="online__avatar-container">
          <img
            className="online__avatar"
            src={require("../../../images/dummy/white.jpeg").default}
            alt=""
          />
          <div className="online__onliness">
            <IoEllipseSharp size={15} className="online__online" />
          </div>
          <div className="online__name">{nickname}</div>
        </div>
        <div className="online__dropstart" onClick={clickHandler}>
          <IoChevronDownOutline
            size={15}
            className={loader ? "online__drop-click" : "online__drop"}
          />
        </div>
      </div>
      {loader && <OnlineUserDropDown nickname={userName} messages={messages} />}
    </>
  );
};

export default OnlineUser;
