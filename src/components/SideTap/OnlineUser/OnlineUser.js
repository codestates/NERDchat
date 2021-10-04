import React, { useState, useRef, useEffect } from "react";

import { IoChevronForwardOutline } from "react-icons/io5";

import OnlineUserDropDown from "./DropDown/OnlineUserDropDown";
import socket from "../../../hooks/socket";
import "./OnlineUser.scss";

const OnlineUser = ({ avatar, nickname, messages, online, userInfo }) => {
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState({ data: {} });
  const dropRef = useRef();

  useEffect(() => {
    socket.on(
      "private message",
      async ({ content, from, to, invite, friend }) => {
        const incomingM = { content, from, to, invite, friend };
        setMsg((prev) => {
          const temp = { ...prev.data };
          const sender = from;
          if (!temp[to]) {
            temp[sender] = [incomingM];
            if (!temp[to]) {
              temp[to] = [incomingM];
            } else {
              temp[to].push(incomingM);
            }
            return { data: temp };
          } else {
            if (!temp[to]) {
              temp[to] = [incomingM];
            } else {
              temp[to].push(incomingM);
            }
            temp[sender].push(incomingM);
            return { data: temp };
          }
        });
      }
    );
    return () => {
      socket.off("private message");
    };
  }, [nickname]);

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
            src={
              avatar !== ""
                ? avatar
                : require("../../../images/dummy/white.jpeg").default
            }
            alt=""
          />
          {/* <div className="online__onliness">
            <IoEllipseSharp size={15} className="online__online" />
          </div> */}
          <div className={online ? "online__name" : "offline__name"}>
            {nickname}
          </div>
        </div>
        <div className="online__dropstart" onClick={clickHandler}>
          <IoChevronForwardOutline
            size={15}
            className={loader ? "online__drop-click" : "online__drop"}
          />
        </div>
      </div>
      {loader && (
        <OnlineUserDropDown
          userInfo={userInfo}
          nickname={nickname}
          messages={messages}
          msg={msg}
          setMsg={setMsg}
        />
      )}
    </>
  );
};

export default OnlineUser;
