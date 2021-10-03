import React, { useContext } from "react";
import {
  IoFingerPrintOutline,
  IoMailOpenOutline,
  IoNotificationsOutline,
  IoAddOutline,
} from "react-icons/io5";
import PrivateMessageModal from "../../PrivateMessageModal/PrivateMessageModal";
import UserAdd from "../../friend/UserAdd";
import UserInfo from "../../userInfo/UserInfo";
import Invite from "../../invite/Invite";
import { Context } from "../../../context/ContextProvider";
import "./MsgListDropDown.scss";

const MsgListDropDown = ({
  nickname,
  messages,
  userInfo,
  setLastMsg,
  dropDownHandler,
}) => {
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
  const closeDropDown = (e) => {
    console.log(e.target);
    dropDownHandler();
  };
  return (
    <div className="msgList__wrapper" onClick={closeDropDown}>
      {privateModalOpen && (
        <PrivateMessageModal
          nickname={nickname}
          messages={messages}
          setLastMsg={setLastMsg}
        />
      )}
      {userInfoModalOpen && <UserInfo nickname={nickname} />}
      {inviteModalOpen && <Invite nickname={nickname} userInfo={userInfo} />}
      {addFriendModalOpen && (
        <UserAdd nickname={nickname} userInfo={userInfo} />
      )}
      <ul className="msgList__menu">
        <li className="msgList__li">
          <div>
            <div className="msgList__a" onClick={userInfoModalOpenHandler}>
              <div className="msgList__icon">
                <IoFingerPrintOutline className="icona" />
              </div>
              Info
            </div>
          </div>
        </li>
        <li className="msgList__li">
          <div className="msgList__a" onClick={privateModalOpenHandler}>
            <div className="msgList__icon">
              <IoMailOpenOutline className="icona" />
            </div>
            Message
          </div>
        </li>
        <li className="msgList__li">
          <div className="msgList__a" onClick={inviteModalOpenHandler}>
            <div className="msgList__icon">
              <IoNotificationsOutline className="icona" />
            </div>
            Invite
          </div>
        </li>
        <li className="msgList__li">
          <div className="msgList__a" onClick={addUserModalHandler}>
            <div className="msgList__icon">
              <IoAddOutline className="icona" />
            </div>
            Add
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MsgListDropDown;
