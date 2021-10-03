import React, { useState, useRef, useEffect } from "react";

import { IoChevronDownOutline, IoEllipseSharp } from "react-icons/io5";

import DropDown from "./DropDown/DropDown";
import socket from "../../../hooks/socket";
import "./FriendList.scss";

const FriendList = ({ avatar, nickname, messages, online, userInfo }) => {
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
        <DropDown
          userInfo={userInfo}
          nickname={nickname}
          messages={messages}
          msg={msg}
          // sendHandler={sendHandler}
          setMsg={setMsg}
        />
      )}
    </>
  );
};

export default FriendList;
