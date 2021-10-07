import { useState, useContext } from "react";
import MsgListDropDown from "./MsgListDropDown";
import "./Messenger.scss";
import { Context } from "../../../context/ContextProvider";

const Messenger = ({
  avatar,
  nickname,
  messages,
  userInfo,
  online,
  userId,
  readMsgHandler,
  sendMsgHandler,
  msg,
}) => {
  const {
    userInfoModalOpen,
    addFriendModalOpen,
    privateModalOpen,
    inviteModalOpen,
  } = useContext(Context);

  const [modalOpen, setModalOpen] = useState(false);

  const modalHandler = () => {
    setModalOpen((prev) => !prev);
  };
  const backgroundCloseHandler = (e) => {
    if (
      !userInfoModalOpen &&
      !addFriendModalOpen &&
      !privateModalOpen &&
      !inviteModalOpen
    )
      setModalOpen(false);
  };

  return (
    <div
      className={
        msg.data[nickname] && !msg.data[nickname].read ? "new__msg__alarm" : ""
      }
    >
      <div
        className={online ? "messagelist" : "messagelist offline"}
        onClick={modalHandler}
      >
        <div className="userInfo__container">
          <div className="m__avatar__container">
            <img
              className="m__avatar"
              src={
                avatar !== ""
                  ? avatar
                  : require("../../../images/dummy/white.jpeg").default
              }
              alt="m_avatar"
            />
          </div>
        </div>
        <div className="latest__message__container">
          <div className="m__name">
            <p>{nickname}</p>
          </div>
          <div className="latest__message__content">
            <div>
              {!msg.data[nickname] && messages[messages.length - 1].content}
            </div>
            <div>
              {msg.data[nickname] && msg.data[nickname].messages
                ? msg.data[nickname].messages[
                    msg.data[nickname].messages.length - 1
                  ].content
                : null}
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <MsgListDropDown
          userInfo={userInfo}
          nickname={nickname}
          messages={messages}
          msg={msg}
          userId={userId}
          setMsg={sendMsgHandler}
          readMsgHandler={readMsgHandler}
          backgroundCloseHandler={backgroundCloseHandler}
        />
      )}
    </div>
  );
};

export default Messenger;
