import React, { useContext, useState } from "react";
import {
  IoFingerPrintOutline,
  IoMailOpenOutline,
  IoNotificationsOutline,
  IoAddOutline,
} from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import UserDelete from "../../../friend/UserDelete";
import { Context } from "../../../../context/ContextProvider";
import "./OnlineUserDropDown.scss";

function OnlineUserDropDown({ nickname, messages }) {
  const { gameId, roomId, chatId } = useParams();
  const inviteLink = window.location.href;
  console.log("from onlineuserdropdown: ", gameId, roomId, chatId);
  console.log("InviteLink from onlineuserdropdown: ", inviteLink);
  const [userNickname, setUserNickname] = useState(nickname);
  const { deleteFriendModalHandler, deleteFriendModalOpen } =
    useContext(Context);
  const deleteModalHandler = () => {
    deleteFriendModalHandler();
  };

  return (
    <div className="onlinelist__wrapper">
      {deleteFriendModalOpen && <UserDelete nickname={userNickname} />}
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
          <Link
            to={`/private=${nickname}`}
            state={{
              messages: messages,
              nickname: nickname,
            }}
          >
            <div className="onlinelist__icon">
              <IoMailOpenOutline className="icona" />
            </div>
            Message
          </Link>
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
