import React, { useState, useRef, useEffect } from "react";

import { IoChevronDownOutline, IoEllipseSharp } from "react-icons/io5";

import OnlineUserDropDown from "./DropDown/OnlineUserDropDown";
import socket from "../../../hooks/socket";
import "./OnlineUser.scss";

const OnlineUser = ({ avatar, nickname, messages, online, userInfo }) => {
  const [loader, setLoader] = useState(false);
  const [msg, setMsg] = useState([]);
  const dropRef = useRef();

  useEffect(() => {
    socket.on("private message", ({ content, to, invite, friend }) => {
      console.log("listen!", content, to);
      const incomingM = { content, from: nickname, to, invite, friend };
      setMsg((prev) => [...prev, incomingM]);
    });
    return () => {
      socket.off("private message");
    };
  }, [socket]);

  const clickHandler = () => {
    setLoader((prev) => !prev);
  };
  //메시지 보내기
  const sendHandler = (e) => {
    e.preventDefault();
    socket.emit("private message", { content: e.target.value, to: nickname });
    const incomingM = {
      content: e.target.value,
      from: userInfo.userId,
      to: nickname,
    };
    setMsg((prev) => [...prev, incomingM]);
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
          <IoChevronDownOutline
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
          sendHandler={sendHandler}
          setMsg={setMsg}
        />
      )}
    </>
  );
};

export default OnlineUser;
