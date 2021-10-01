import React, { useContext } from "react";

import {
  IoFingerPrintOutline,
  IoMailOpenOutline,
  IoNotificationsOutline,
  IoAddOutline,
} from "react-icons/io5";

import PrivateMessageModal from "../../../PrivateMessageModal/PrivateMessageModal";
import { useParams } from "react-router-dom";
import UserAdd from "../../../friend/UserAdd";
import { Context } from "../../../../context/ContextProvider";
import "./OnlineUserDropDown.scss";

function OnlineUserDropDown({ nickname, messages, privateHandler, msg }) {
  const { gameId, roomId, chatId } = useParams();
  const inviteLink = window.location.href;
  const {
    addFriendModalHandler,
    addFriendModalOpen,
    privateModalHandler,
    privateModalOpen,
  } = useContext(Context);

  const addUserModalHandler = () => {
    addFriendModalHandler();
  };
  const privateModalOpenHandler = () => {
    privateModalHandler();
  };

  return (
    <div className="onlinelist__wrapper">
      {privateModalOpen && (
        <PrivateMessageModal
          nickname={nickname}
          messages={messages}
          privateHandler={privateHandler}
          msg={msg}
        />
      )}
      {addFriendModalOpen && <UserAdd nickname={nickname} />}
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
          <a href="#" onClick={addUserModalHandler}>
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
