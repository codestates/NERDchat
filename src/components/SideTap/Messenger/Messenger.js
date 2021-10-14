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
  sendMsgHandler,
  lastMsg,
  readHandler,
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
  const hasLastMsg = {};
  lastMsg.forEach((m, idx) => {
    if (m.nickname === nickname) {
      hasLastMsg.value = true;
      hasLastMsg.index = idx;
    }
  });
  return (
    <>
      <div
        className={online ? "messagelist" : "messagelist offline"}
        onClick={modalHandler}
      >
        <div
          className={
            hasLastMsg.value && !lastMsg[hasLastMsg.index].read
              ? "new__msg__alarm"
              : "no__alarm"
          }
        ></div>
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
            <div>{messages[messages.length - 1].content}</div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <MsgListDropDown
          userInfo={userInfo}
          nickname={nickname}
          messages={messages}
          userId={userId}
          setMsg={sendMsgHandler}
          backgroundCloseHandler={backgroundCloseHandler}
          readHandler={readHandler}
        />
      )}
    </>
  );
};

export default Messenger;
