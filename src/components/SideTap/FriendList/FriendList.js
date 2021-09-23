import React, { useState, useEffect } from "react";
import {
  IoBatteryFull,
  IoBatteryDead,
  IoChevronDown,
  IoFingerPrintOutline,
  IoMailOpenOutline,
  IoPaperPlaneOutline,
  IoCutOutline,
} from "react-icons/io5";
import DropDown from "./DropDown/DropDown";

import "./FriendList.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const FriendList = () => {
  const [userName, setUserName] = useState("Nickname");
  const [loader, setLoader] = useState(false);

  const clickHandler = () => {
    setLoader((prev) => !prev);
  };
  // const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  // const [loader, setLoader] = useState(true);

  // const loadinghandler = (e) => {
  //   console.log(e);
  // };

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
