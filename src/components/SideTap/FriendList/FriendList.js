import React, { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";

import { IoBatteryFull, IoBatteryDead, IoChevronDown } from "react-icons/io5";
import DropDown from "./DropDown/DropDown";

import "./FriendList.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const FriendList = () => {
  const cookies = new Cookies();

  let userInfo = cookies.get("userInfo");
  console.log(userInfo);

  const [userName, setUserName] = useState("Nickname");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/friends/lists`, { withCredentials: true })
      .then((data) => console.log(data));
  }, []);

  const clickHandler = () => {
    setLoader((prev) => !prev);
  };

  return (
    <>
      <div className="friendlist__body">
        <div className="friendlist__body__nav">
          <div className="friendlist__name" onClick={clickHandler}>
            {userName} <IoChevronDown size={20} className="name-icon" />
          </div>
          {loader && <DropDown />}
        </div>
      </div>
    </>
  );
};

export default FriendList;
