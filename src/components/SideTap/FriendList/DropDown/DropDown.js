import React, { useContext, useState } from "react";
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
import { Context } from "../../../../context/ContextProvider";
import "./DropDown.scss";

function DropDown({ nickname, privateHandler, msg }) {
  const { gameId, roomId, chatId } = useParams();
  const inviteLink = window.location.href;

  const {
    deleteFriendModalHandler,
    deleteFriendModalOpen,
    privateModalHandler,
    privateModalOpen,
    userInfoModalHandler,
    userInfoModalOpen,
  } = useContext(Context);

  const deleteModalHandler = () => {
    deleteFriendModalHandler();
  };
  const privateModalOpenHandler = () => {
    privateModalHandler();
  };

  const userInfoModalOpenHandler = () => {
    userInfoModalHandler();
  };

  return (
    <div className="friendlist__wrapper">
      {privateModalOpen && (
        <PrivateMessageModal
          nickname={nickname}
          privateHandler={privateHandler}
          msg={msg}
        />
      )}
      {deleteFriendModalOpen && <UserDelete nickname={nickname} />}
      {userInfoModalOpen && <UserInfo nickname={nickname} />}
      <ul className="friendlist__menu">
        <li className="friendlist__li">
          <a
            href="#"
            className="friendlist__a"
            onClick={userInfoModalOpenHandler}
          >
            <div className="friendlist__icon">
              <IoFingerPrintOutline className="icona" />
            </div>
            Info
          </a>
        </li>
        <li className="friendlist__li">
          <div onClick={privateModalOpenHandler}>
            <div className="friendlist__icon">
              <IoMailOpenOutline className="icona" />
            </div>
            Message
          </div>
        </li>
        <li className="friendlist__li">
          <a href="#">
            <div className="friendlist__icon">
              <IoNotificationsOutline className="icona" />
            </div>
            Invite
          </a>
        </li>
        <li className="friendlist__li">
          <a href="#" onClick={deleteModalHandler}>
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
