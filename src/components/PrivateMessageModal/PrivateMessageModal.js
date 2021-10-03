import { useEffect, useRef, useState } from "react";
import Modal from "../../UI/modal/Modal";
import PMessage from "./PMessage/PMessage";
import PInput from "./PInput/PInput";
import socket from "../../hooks/socket";
import { Cookies } from "react-cookie";

function PrivateMessageModal({ nickname, messages, setLastMsg }) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const [msgHistory, setMsgHistory] = useState(messages);
  const [msg, setMsg] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messageEl = useRef(null);
  const newMessageEl = useRef(null);

  //정보 최신화 핸들러
  useEffect(() => {
    socket.on("private message", ({ content, to, invite, friend }) => {
      console.log("listen!", invite);
      const incomingM = { content, from: nickname, to, invite, friend };
      setMsg((prev) => [...prev, incomingM]);
      setLastMsg(incomingM);
    });
    return () => {
      socket.off("private message");
    };
  }, [nickname, messages, socket]);

  //메시지입력핸들러
  const msgInputHandler = (e) => {
    setNewMsg(e.target.value);
    e.preventDefault();
  };

  //메시지 보내기
  const sendHandler = (e) => {
    socket.emit("private message", { content: newMsg, to: nickname });
    const incomingM = { content: newMsg, from: userInfo.userId, to: nickname };
    setMsg((prev) => [...prev, incomingM]);
    setLastMsg(incomingM);
    e.preventDefault();
    setNewMsg("");
  };

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

  return (
    <Modal>
      <div className="chatApp__messages" ref={messageEl}>
        {msgHistory &&
          msgHistory.map((m, i) => (
            <div key={i} className={`chatApp__msg`}>
              <PMessage message={m} userInfo={userInfo} setMsg={setMsg} />
            </div>
          ))}
        {msg &&
          msg.map((m, i) => (
            <div key={i} className={`chatApp__msg`}>
              <PMessage message={m} userInfo={userInfo} setMsg={setMsg} />
            </div>
          ))}
        <div ref={newMessageEl} />
      </div>
      <div className="chatApp__footer">
        <PInput
          msgInputHandler={msgInputHandler}
          newMsg={newMsg}
          sendHandler={sendHandler}
        />
      </div>
    </Modal>
  );
}

export default PrivateMessageModal;
