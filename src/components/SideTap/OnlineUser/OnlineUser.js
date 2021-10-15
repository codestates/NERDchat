import React, { useState, useRef, useContext } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import OnlineUserDropDown from "./DropDown/OnlineUserDropDown";
import { Context } from "../../../context/ContextProvider";
import "./OnlineUser.scss";

const OnlineUser = ({
  avatar,
  nickname,
  messages,
  online,
  userInfo,
  userId,
  sendMsgHandler,
  readHandler,
}) => {
  const {
    userInfoModalOpen,
    addFriendModalOpen,
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
      !addFriendModalOpen &&
      !privateModalOpen &&
      !inviteModalOpen
    )
      setLoader(false);
  };

  return (
    <>
      <div className="online__container" ref={dropRef}>
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
          setMsg={sendMsgHandler}
          userId={userId}
          backgroundCloseHandler={backgroundCloseHandler}
          readHandler={readHandler}
        />
      )}
    </>
  );
};

export default OnlineUser;
