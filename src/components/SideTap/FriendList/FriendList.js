import React, { useState, useRef, useEffect, useContext } from "react";
import { IoChevronForwardOutline, IoEllipseSharp } from "react-icons/io5";
import { Context } from "../../../context/ContextProvider";
import DropDown from "./DropDown/DropDown";
import socket from "../../../hooks/socket";
import "./FriendList.scss";

const FriendList = ({
  avatar,
  nickname,
  messages,
  online,
  userInfo,
  userId,
  readMsgHandler,
  sendMsgHandler,
  msg,
}) => {
  const {
    userInfoModalOpen,
    deleteFriendModalOpen,
    privateModalOpen,
    inviteModalOpen,
  } = useContext(Context);
  const [loader, setLoader] = useState(false);

  const dropRef = useRef();

  const clickHandler = () => {
    setLoader((prev) => !prev);
  };

  const backgroundCloseHandler = (e) => {
    if (
      !userInfoModalOpen &&
      !deleteFriendModalOpen &&
      !privateModalOpen &&
      !inviteModalOpen
    )
      setLoader(false);
  };

  return (
    <>
      <div className="friend__container" ref={dropRef}>
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
          <IoChevronForwardOutline
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
          userId={userId}
          setMsg={sendMsgHandler}
          backgroundCloseHandler={backgroundCloseHandler}
          readMsgHandler={readMsgHandler}
        />
      )}
    </>
  );
};

export default FriendList;
