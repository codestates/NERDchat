import React, { useContext, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  IoFingerPrintOutline,
  IoMailOpenOutline,
  IoNotificationsOutline,
  IoCutOutline,
} from "react-icons/io5";
import PrivateMessageModal from "../../../PrivateMessageModal/PrivateMessageModal";
import UserDelete from "../../../friend/UserDelete";
import UserInfo from "../../../userInfo/UserInfo";
import Invite from "../../../invite/Invite";
import { Context } from "../../../../context/ContextProvider";
import "./DropDown.scss";

function DropDown({
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
    deleteFriendModalHandler,
    deleteFriendModalOpen,
    privateModalHandler,
    privateModalOpen,
    userInfoModalHandler,
    userInfoModalOpen,
    inviteModalOpen,
    inviteModalHandler,
  } = useContext(Context);
  const dropdownRef = useRef();

  useEffect(() => {
    dropdownRef.current.focus();
  }, [
    userInfoModalOpen,
    deleteFriendModalOpen,
    privateModalOpen,
    inviteModalOpen,
  ]);
  const deleteModalHandler = () => {
    deleteFriendModalHandler();
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
      className="friendlist__wrapper"
      tabIndex={0}
      ref={dropdownRef}
      onBlur={backgroundCloseHandler}
    >
      {privateModalOpen && (
        <PrivateMessageModal
          nickname={nickname}
          messages={messages}
          msg={msg.data}
          setMsg={setMsg}
          userInfo={userInfo}
          readMsgHandler={readMsgHandler}
        />
      )}
      {userInfoModalOpen && <UserInfo nickname={nickname} />}
      {inviteModalOpen && <Invite nickname={nickname} userInfo={userInfo} />}
      {deleteFriendModalOpen && <UserDelete nickname={nickname} />}
      <ul className="friendlist__menu">
        <li className="friendlist__li">
          <a className="friendlist__a" onClick={userInfoModalOpenHandler}>
            <div className="friendlist__icon">
              <IoFingerPrintOutline className="icona" />
            </div>
            Info
          </a>
        </li>
        <li className="friendlist__li">
          <a onClick={privateModalOpenHandler}>
            <div className="friendlist__icon">
              <IoMailOpenOutline className="icona" />
            </div>
            DM
          </a>
        </li>
        <li className="friendlist__li">
          <a onClick={inviteModalOpenHandler}>
            <div className="friendlist__icon">
              <IoNotificationsOutline className="icona" />
            </div>
            Invite
          </a>
        </li>
        <li className="friendlist__li">
          <a onClick={deleteModalHandler}>
            <div className="friendlist__icon">
              <IoCutOutline className="icona" />
            </div>
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DropDown;
