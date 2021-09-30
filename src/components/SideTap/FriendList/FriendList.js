import React, { useState, useRef } from "react";

import { IoChevronDownOutline, IoEllipseSharp } from "react-icons/io5";

import DropDown from "./DropDown/DropDown";

import "./FriendList.scss";

const FriendList = ({ avatar, nickname }) => {
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
        className="friend__container"
        ref={dropRef}
        onClick={backgroundCloseHandler}
      >
        <div className="friend__avatar-container">
          <img
            className="friend__avatar"
            src={
              avatar !== null
                ? avatar
                : require("../../../images/dummy/white.jpeg").default
            }
            alt=""
          />
          {/* <div className="friend__onliness">
            <IoEllipseSharp size={15} className="friend__online" />
          </div> */}
          <div className="friend__name">{nickname}</div>
        </div>
        <div className="friend__dropstart" onClick={clickHandler}>
          <IoChevronDownOutline
            size={15}
            className={loader ? "friend__drop-click" : "friend__drop"}
          />
        </div>
      </div>
      {loader && <DropDown nickname={userName} />}
    </>
  );
};

export default FriendList;
