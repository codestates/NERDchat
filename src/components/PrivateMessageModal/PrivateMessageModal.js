import { useEffect, useRef, useState } from "react";
import Modal from "../../UI/modal/Modal";
import PMessage from "./PMessage/PMessage";
import PInput from "./PInput/PInput";
import socket from "../../hooks/socket";
import { Cookies } from "react-cookie";

function PrivateMessageModal({
  userInfo,
  nickname,
  setMsg,
  messages,
  msg,
  readMsgHandler,
}) {
  const [msgHistory, setMsgHistory] = useState(messages);
  const messageEl = useRef(null);
  const newMessageEl = useRef(null);

  useEffect(() => {
    messageEl.current.scrollTop = messageEl.current.scrollHeight;
  });

  useEffect(() => {
    if (messageEl.current) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [msg]);

  useEffect(() => {
    // readMsgHandler(nickname);
  }, [msg]);

  //메시지 보내기
  const sendHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    //보낼 메시지
    const sendingM = {
      content: e.target.value,
      from: userInfo.nickname,
      to: nickname,
    };
    socket.emit("private message", { content: e.target.value, to: nickname });
    setMsg(sendingM, userInfo.nickname, nickname);
  };

  return (
    <Modal>
      <div className="chatApp__messages" ref={messageEl}>
        {msgHistory &&
          msgHistory.map((m, i) => (
            <div key={i} className={`chatApp__msg`}>
              <PMessage message={m} userInfo={userInfo} setMsg={setMsg} />
            </div>
          ))}
        {msg[nickname] &&
          msg[nickname].messages &&
          msg[nickname].messages.map((m, i) => (
            <div key={i} className={`chatApp__msg`}>
              <PMessage message={m} userInfo={userInfo} setMsg={setMsg} />
            </div>
          ))}
        <div ref={newMessageEl} />
      </div>
      <div className="chatApp__footer">
        <PInput
          // msgInputHandler={msgInputHandler}
          // newMsg={newMsg}
          sendHandler={sendHandler}
          // setNewMsg={setNewMsg}
        />
      </div>
    </Modal>
  );
}

export default PrivateMessageModal;
