import React, { useContext, useRef, useEffect } from "react";
import {
  IoFingerPrintOutline,
  IoMailOpenOutline,
  IoNotificationsOutline,
  IoAddOutline,
} from "react-icons/io5";
import PrivateMessageModal from "../../../PrivateMessageModal/PrivateMessageModal";
import UserAdd from "../../../friend/UserAdd";
import UserInfo from "../../../userInfo/UserInfo";
import Invite from "../../../invite/Invite";
import { Context } from "../../../../context/ContextProvider";
import "./OnlineUserDropDown.scss";

function OnlineUserDropDown({
  nickname,
  messages,
  userInfo,
  msg,
  userId,
  setMsg,
  backgroundCloseHandler,
  readMsgHandler,
}) {
  const {
    userInfoModalHandler,
    userInfoModalOpen,
    addFriendModalHandler,
    addFriendModalOpen,
    privateModalHandler,
    privateModalOpen,
    inviteModalOpen,
    inviteModalHandler,
  } = useContext(Context);

  const dropdownRef = useRef();

  useEffect(() => {
    dropdownRef.current.focus();
  }, [
    userInfoModalOpen,
    addFriendModalOpen,
    privateModalOpen,
    inviteModalOpen,
  ]);
  const addUserModalHandler = () => {
    addFriendModalHandler();
  };
  const privateModalOpenHandler = () => {
    privateModalHandler();
  };
  const userInfoModalOpenHandler = () => {
    userInfoModalHandler();
  };
  const inviteModalOpenHandler = () => {
    inviteModalHandler();
  };

  return (
    <div
      className="onlinelist__wrapper"
      tabIndex={0}
      ref={dropdownRef}
      onBlur={backgroundCloseHandler}
    >
      {privateModalOpen && (
        <PrivateMessageModal
          userInfo={userInfo}
          nickname={nickname}
          messages={messages}
          msg={msg.data}
          setMsg={setMsg}
          readMsgHandler={readMsgHandler}
        />
      )}
      {userInfoModalOpen && <UserInfo nickname={nickname} />}
      {inviteModalOpen && <Invite nickname={nickname} userInfo={userInfo} />}
      {addFriendModalOpen && (
        <UserAdd
          nickname={nickname}
          userInfo={userInfo}
          setMsg={setMsg}
          userId={userId}
        />
      )}
      <ul className="onlinelist__menu">
        <li className="onlinelist__li">
          <div className="onlinelist__a" onClick={userInfoModalOpenHandler}>
            <div className="onlinelist__icon">
              <IoFingerPrintOutline className="icona" />
            </div>
            Info
          </div>
        </li>
        <li className="onlinelist__li">
          <div className="onlinelist__a" onClick={privateModalOpenHandler}>
            <div className="onlinelist__icon">
              <IoMailOpenOutline className="icona" />
            </div>
            DM
          </div>
        </li>
        <li className="onlinelist__li">
          <div className="onlinelist__a" onClick={inviteModalOpenHandler}>
            <div className="onlinelist__icon">
              <IoNotificationsOutline className="icona" />
            </div>
            Invite
          </div>
        </li>
        <li className="onlinelist__li">
          <div className="onlinelist__a" onClick={addUserModalHandler}>
            <div className="onlinelist__icon">
              <IoAddOutline className="icona" />
            </div>
            Add
          </div>
        </li>
      </ul>
    </div>
  );
}

export default OnlineUserDropDown;
