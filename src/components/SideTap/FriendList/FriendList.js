import React, { useState, useRef } from "react";

import { IoChevronDownOutline, IoEllipseSharp } from "react-icons/io5";

import DropDown from "./DropDown/DropDown";

import "./FriendList.scss";

const FriendList = ({ avatar, nickname, messages, online, userInfo }) => {
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
            className={online ? "friend__avatar" : "friendoff__avatar"}
            src={
              avatar
                ? avatar
                : require("../../../images/dummy/white.jpeg").default
            }
            alt=""
          />
          {/* <div className="friend__onliness">
            <IoEllipseSharp size={15} className="friend__online" />
          </div> */}
          <div className={online ? "friend__name" : "friendoff__name"}>
            {nickname}
          </div>
        </div>
        <div className="friend__dropstart" onClick={clickHandler}>
          <IoChevronDownOutline
            size={15}
            className={loader ? "friend__drop-click" : "friend__drop"}
          />
        </div>
      </div>
      {loader && (
        <DropDown nickname={nickname} messages={messages} userInfo={userInfo} />
      )}
    </>
  );
};

export default FriendList;
