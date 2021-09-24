import React, { useContext } from "react";

import {
  IoFingerPrintOutline,
  IoMailOpenOutline,
  IoNotificationsOutline,
  IoAddOutline,
} from "react-icons/io5";
import UserDelete from "../../../friend/UserDelete";
import { Context } from "../../../../context/ContextProvider";
import "./OnlineUserDropDown.scss";

function OnlineUserDropDown({ nickname }) {
  const { deleteFriendModalHandler, deleteFriendModalOpen } =
    useContext(Context);

  const deleteModalHandler = () => {
    deleteFriendModalHandler();
  };
  return (
    <div className="onlineuser__wrapper">
      {deleteFriendModalOpen && <UserDelete nickname={nickname} />}
      <ul className="onlineuser__menu">
        <li className="onlineuser__li">
          <a href="#" className="onlineuser__a">
            <div className="onlineuser__icon">
              <IoFingerPrintOutline className="onlineuser__icon_icon" />
            </div>
            Information
          </a>
        </li>
        <li className="onlineuser__li">
          <a href="#">
            <div className="onlineuser__icon">
              <IoMailOpenOutline />
            </div>
            Message
          </a>
        </li>
        <li className="onlineuser__li">
          <a href="#">
            <div className="onlineuser__icon">
              <IoNotificationsOutline />
            </div>
            Invite
          </a>
        </li>
        <li className="onlineuser__li">
          <a href="#" onClick={deleteModalHandler}>
            <div className="onlineuser__icon">
              <IoAddOutline />
            </div>
            Add
          </a>
        </li>
      </ul>
    </div>
  );
}

export default OnlineUserDropDown;
