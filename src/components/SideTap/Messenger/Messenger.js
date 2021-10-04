import { useState, useEffect, useReducer } from "react";
import MsgListDropDown from "./MsgListDropDown";
import socket from "../../../hooks/socket";
import "./Messenger.scss";

const Messenger = ({ avatar, nickname, messages, userInfo, online }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [msg, setMsg] = useState({ data: {} });
  const [loading, setLoading] = useState(false);
  const [showingMsg, setShowMsg] = useState("");
  const modalHandler = () => {
    setModalOpen((prev) => !prev);
  };
  //여기에서 private message이벤트를 들어야 실시간 통신이 될듯.
  //메시지 듣기
  useEffect(() => {
    //본인이 보낸 메시지는 아래 이벤트가 발생하지 않음
    //i.e. 보낼때 직접 state에 넣어줘야 바로 반영이 된다.
    socket.on(
      "private message",
      async ({ content, from, to, invite, friend }) => {
        const incomingM = { content, from, to, invite, friend };
        setMsg((prev) => {
          const temp = { ...prev.data };
          const sender = from;
          if (!temp[to]) {
            temp[sender] = [incomingM];
            if (!temp[to]) {
              temp[to] = [incomingM];
            } else {
              temp[to].push(incomingM);
            }
            return { data: temp };
          } else {
            if (!temp[to]) {
              temp[to] = [incomingM];
            } else {
              temp[to].push(incomingM);
            }
            temp[sender].push(incomingM);
            return { data: temp };
          }
        });
      }
    );
    return () => {
      socket.off("private message");
    };
  }, [nickname]);

  return (
    <>
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
            {!msg.data[nickname] && messages[messages.length - 1].content}
            {msg.data[nickname] &&
              msg.data[nickname][msg.data[nickname].length - 1].content}
          </div>
        </div>
      </div>
      {modalOpen && (
        <MsgListDropDown
          userInfo={userInfo}
          nickname={nickname}
          messages={messages}
          msg={msg}
          // sendHandler={sendHandler}
          setMsg={setMsg}
        />
      )}
    </>
  );
};

export default Messenger;
