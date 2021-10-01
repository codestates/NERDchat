import Modal from "../../UI/modal/Modal";
import { useEffect, useRef, useState } from "react";
import PMessage from "./PMessage/PMessage";
import PInput from "./PInput/PInput";

function PrivateMessageModal({ nickname, messages, privateHandler, msg }) {
  const [newMsg, setNewMsg] = useState("");
  const messageEl = useRef(null);
  const newMessageEl = useRef(null);

  const msgInputHandler = (e) => {
    setNewMsg(e.target.value);
    e.preventDefault();
  };
  const sendHandler = (e) => {
    privateHandler(newMsg, nickname);
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
        {messages &&
          messages.map((m, i) => (
            <div key={i} className={`chatApp__msg`}>
              <PMessage message={m} />
            </div>
          ))}
        {msg.map((m, i) => (
          <div key={i} className={`chatApp__msg`}>
            <PMessage message={m} />
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
