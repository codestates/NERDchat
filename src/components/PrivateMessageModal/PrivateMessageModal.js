import { useEffect, useRef, useState } from "react";
import Modal from "../../UI/modal/Modal";
import PMessage from "./PMessage/PMessage";
import PInput from "./PInput/PInput";
import socket from "../../hooks/socket";
import { Cookies } from "react-cookie";

function PrivateMessageModal({ nickname, setMsg, messages, msg, sendHandler }) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const [msgHistory, setMsgHistory] = useState(messages);
  // const [msg, setMsg] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messageEl = useRef(null);
  const newMessageEl = useRef(null);
  console.log(9999, msg);
  const testmsg = [];
  // const testmsg = msg[0][nickname] || [];

  //메시지입력핸들러
  const msgInputHandler = (e) => {
    e.preventDefault();
    setNewMsg(e.target.value);
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
        {testmsg &&
          testmsg.map((m, i) => (
            <div key={i} className={`chatApp__msg`}>
              <PMessage message={m} userInfo={userInfo} />
            </div>
          ))}
        <div ref={newMessageEl} />
      </div>
      <div className="chatApp__footer">
        <PInput
          msgInputHandler={msgInputHandler}
          newMsg={newMsg}
          sendHandler={sendHandler}
          setNewMsg={setNewMsg}
        />
      </div>
    </Modal>
  );
}

export default PrivateMessageModal;
