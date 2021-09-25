import React, { useContext, useState } from "react";

import {
  IoFingerPrintOutline,
  IoMailOpenOutline,
  IoNotificationsOutline,
  IoCutOutline,
} from "react-icons/io5";
import UserDelete from "../../../friend/UserDelete";
import { Context } from "../../../../context/ContextProvider";
import "./DropDown.scss";

function DropDown({ nickname }) {
  const [userNickname, setUserNickname] = useState(nickname);
  const { deleteFriendModalHandler, deleteFriendModalOpen } =
    useContext(Context);

  const deleteModalHandler = () => {
    deleteFriendModalHandler();
  };

  return (
    <div className="friendlist__wrapper">
      {deleteFriendModalOpen && <UserDelete nickname={userNickname} />}
      <ul className="friendlist__menu">
        <li className="friendlist__li">
          <a href="#" className="friendlist__a">
            <div className="friendlist__icon">
              <IoFingerPrintOutline className="friendlist__icon_icon" />
            </div>
            Information
          </a>
        </li>
        <li className="friendlist__li">
          <a href="#">
            <div className="friendlist__icon">
              <IoMailOpenOutline />
            </div>
            Message
          </a>
        </li>
        <li className="friendlist__li">
          <a href="#">
            <div className="friendlist__icon">
              <IoNotificationsOutline />
            </div>
            Invite
          </a>
        </li>
        <li className="friendlist__li">
          <a href="#" onClick={deleteModalHandler}>
            <div className="friendlist__icon">
              <IoCutOutline />
            </div>
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DropDown;
