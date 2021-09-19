import React, { useState, useEffect } from "react";
import { IoBatteryFull, IoBatteryDead } from "react-icons/io5";

import "./FriendList.scss";

const FriendList = () => {
  const [userName, setUserName] = useState("Nickname");

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  const loadinghandler = (e) => {
    console.log(e);
  };

  return (
    <div className="friendlist">
      <div className="friendonline" onScroll={loadinghandler}>
        <div className="friendonline-Access">
          <IoBatteryFull size={25} />
        </div>
        <div className="friendonline-container">
          <img
            className="onlinefriend"
            src={require("../../../images/dummy/white.jpeg").default}
            alt=""
          />
          <span className="onlinefriendname">{userName}</span>
        </div>
        <div className="friendonline-container">
          <img
            className="onlinefriend"
            src={require("../../../images/dummy/white.jpeg").default}
            alt=""
          />
          <span className="onlinefriendname">{userName}</span>
        </div>
        <div className="friendonline-container">
          <img
            className="onlinefriend"
            src={require("../../../images/dummy/white.jpeg").default}
            alt=""
          />
          <span className="onlinefriendname">{userName}</span>
        </div>
        <div className="friendonline-container">
          <img
            className="onlinefriend"
            src={require("../../../images/dummy/white.jpeg").default}
            alt=""
          />
          <span className="onlinefriendname">{userName}</span>
        </div>
        <div className="friendonline-container">
          <img
            className="onlinefriend"
            src={require("../../../images/dummy/white.jpeg").default}
            alt=""
          />
          <span className="onlinefriendname">{userName}</span>
        </div>
      </div>
      <div className="friendoffline">
        <div className="friendonline">
          <div className="friendoffline-Access">
            <IoBatteryDead size={25} />
          </div>
          <div className="friendonline-container">
            <img
              className="onlinefriend"
              src={require("../../../images/dummy/white.jpeg").default}
              alt=""
            />
            <span className="onlinefriendname">{userName}</span>
          </div>
          <div className="friendonline-container">
            <img
              className="onlinefriend"
              src={require("../../../images/dummy/white.jpeg").default}
              alt=""
            />
            <span className="onlinefriendname">{userName}</span>
          </div>
          <div className="friendonline-container">
            <img
              className="onlinefriend"
              src={require("../../../images/dummy/white.jpeg").default}
              alt=""
            />
            <span className="onlinefriendname">{userName}</span>
          </div>
          <div className="friendonline-container">
            <img
              className="onlinefriend"
              src={require("../../../images/dummy/white.jpeg").default}
              alt=""
            />
            <span className="onlinefriendname">{userName}</span>
          </div>
          <div className="friendonline-container">
            <img
              className="onlinefriend"
              src={require("../../../images/dummy/white.jpeg").default}
              alt=""
            />
            <span className="onlinefriendname">{userName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
