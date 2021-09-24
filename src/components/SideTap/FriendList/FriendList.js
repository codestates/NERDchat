import React, { useState, useRef } from "react";
import { Cookies } from "react-cookie";

import { IoBatteryFull, IoBatteryDead, IoChevronDown } from "react-icons/io5";
import DropDown from "./DropDown/DropDown";

import "./FriendList.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const FriendList = ({ avatar, nickname }) => {
  const cookies = new Cookies();

  console.log(nickname);

  let userInfo = cookies.get("userInfo");

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
        className="friendlist__body"
        ref={dropRef}
        onClick={backgroundCloseHandler}
      >
        <div className="friendlist__body__nav">
          <div className="friendlist__name" onClick={clickHandler}>
            <img
              src={require("../../../images/dummy/white.jpeg").default}
              className="friendlist__avatar"
              alt=""
            />
            <span className="friendlist__name-span">{userName}</span>{" "}
            <div className="name-icon-container">
              <IoChevronDown size={15} className="name-icon" />
            </div>
          </div>
          {loader && <DropDown />}
        </div>
      </div>
    </>
  );
};

export default FriendList;
