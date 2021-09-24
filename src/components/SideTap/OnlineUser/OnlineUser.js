import React, { useState, useRef } from "react";

import { IoChevronDown } from "react-icons/io5";
import OnlineUserDropDown from "./DropDown/OnlineUserDropDown";
import "./OnlineUser.scss";

const OnlineUser = () => {
  const [userName, setUserName] = useState("");
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
        className="onlineuser__body"
        ref={dropRef}
        onClick={backgroundCloseHandler}
      >
        <div className="onlineuser__body__nav">
          <div className="onlineuser__name" onClick={clickHandler}>
            <img
              src={require("../../../images/dummy/white.jpeg").default}
              className="onlineuser__avatar"
              alt=""
            />
            <span className="onlineuser__name-span">{userName}</span>{" "}
            <div className="user-icon-container">
              <IoChevronDown size={15} className="user-icon" />
            </div>
          </div>
          {loader && <OnlineUserDropDown />}
        </div>
      </div>
    </>
  );
};

export default OnlineUser;
