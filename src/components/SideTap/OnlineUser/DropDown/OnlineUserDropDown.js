import React, { useContext } from "react";

import {
  IoFingerPrintOutline,
  IoMailOpenOutline,
  IoNotificationsOutline,
  IoAddOutline,
} from "react-icons/io5";

import PrivateMessageModal from "../../../PrivateMessageModal/PrivateMessageModal";
import { Link, useParams } from "react-router-dom";
import UserDelete from "../../../friend/UserDelete";
import { Context } from "../../../../context/ContextProvider";
import "./OnlineUserDropDown.scss";

function OnlineUserDropDown({ nickname, messages }) {
  const { gameId, roomId, chatId } = useParams();
  const inviteLink = window.location.href;

  const {
    deleteFriendModalHandler,
    deleteFriendModalOpen,
    privateModalHandler,
    privateModalOpen,
  } = useContext(Context);

  const deleteModalHandler = () => {
    deleteFriendModalHandler();
  };
  const privateModalOpenHandler = () => {
    privateModalHandler();
  };

  return (
    <div className="onlinelist__wrapper">
      {privateModalOpen && <PrivateMessageModal nickname={nickname} />}
      {deleteFriendModalOpen && <UserDelete nickname={nickname} />}
      <ul className="onlinelist__menu">
        <li className="onlinelist__li">
          <a href="#" className="onlinelist__a">
            <div className="onlinelist__icon">
              <IoFingerPrintOutline className="icona" />
            </div>
            Info
          </a>
        </li>
        <li className="onlinelist__li">
          <div onClick={privateModalOpenHandler}>
            <div className="onlinelist__icon">
              <IoMailOpenOutline className="icona" />
            </div>
            Message
          </div>
        </li>
        <li className="onlinelist__li">
          <a href="#">
            <div className="onlinelist__icon">
              <IoNotificationsOutline className="icona" />
            </div>
            Invite
          </a>
        </li>
        <li className="onlinelist__li">
          <a href="#" onClick={deleteModalHandler}>
            <div className="onlinelist__icon">
              <IoAddOutline className="icona" />
            </div>
            Add
          </a>
        </li>
      </ul>
    </div>
  );
}

export default OnlineUserDropDown;
