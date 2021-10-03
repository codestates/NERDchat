import { useState, useEffect } from "react";
import MsgListDropDown from "./MsgListDropDown";
import socket from "../../../hooks/socket";
import "./Messenger.scss";

const Messenger = ({ avatar, nickname, messages, userInfo, online }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [msg, setMsg] = useState([{}]);

  const modalHandler = () => {
    setModalOpen((prev) => !prev);
  };
  //여기에서 private message이벤트를 들어야 실시간 통신이 될듯.

  //메시지 듣기
  useEffect(() => {
    socket.on("private message", ({ content, to, invite, friend }) => {
      console.log(101010, msg);
      console.log("listen!", content, to);
      const incomingM = { content, from: nickname, to, invite, friend };
      setMsg((prev) => {
        const temp = [{ ...prev[0] }];
        if (temp[0][nickname]) {
          temp[0][nickname].concat(incomingM);
          console.log(111, temp);
          return temp;
        } else {
          temp[0][nickname] = [incomingM];
          console.log(222, temp);
          return temp;
        }
      });
    });
    return () => {
      // socket.off("private message");
    };
  }, [socket]);

  //메시지 보내기
  const sendHandler = (e) => {
    e.preventDefault();
    const sendingM = {
      content: e.target.value,
      from: userInfo.nickname,
      to: nickname,
      invite: -1,
      friend: -1,
    };
    setMsg((prev) => {
      const temp = [{ ...prev[0] }];
      if (temp[0][nickname]) {
        temp[0][nickname].concat(sendingM);
        console.log(333, temp);
        return temp;
      } else {
        const aux = [];
        temp[0][nickname] = aux;
        temp[0][nickname].push(sendingM);
        console.log(444, temp);
        return temp;
      }
    });

    socket.emit("private message", { content: e.target.value, to: nickname });

    // setMsg((prev) => {
    //   const temp = [{ ...prev[0] }];
    //   if (temp[0][nickname]) {
    //     temp[0][nickname].concat(incomingM);
    //     console.log(333, temp);
    //     return temp;
    //   } else {
    //     const aux = [];
    //     temp[0][nickname] = aux;
    //     temp[0][nickname].push(incomingM);
    //     console.log(444, temp);
    //     return temp;
    //   }
    // });
  };

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
            {msg[0][nickname] || messages[messages.length - 1].content}
            {msg[0][nickname] &&
              msg[0][nickname][msg[0][nickname].length - 1].content}
          </div>
        </div>
      </div>
      {modalOpen && (
        <MsgListDropDown
          userInfo={userInfo}
          nickname={nickname}
          messages={messages}
          // msg={msg}
          sendHandler={sendHandler}
          setMsg={setMsg}
        />
      )}
    </>
  );
};

export default Messenger;
