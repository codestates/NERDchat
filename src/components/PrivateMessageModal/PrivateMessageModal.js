import Modal from "../../UI/modal/Modal";
import { useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import useDM from "../../hooks/useDM";

import PMessage from "./PMessage/PMessage";
import PInput from "./PInput/PInput";

function PrivateMessageModal({ nickname, messages }) {
  const [newMsg, setNewMsg] = useState("");

  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const messageEl = useRef(null);

  const { privateMessageHandler, msg, userListRef } = useDM(userInfo, nickname);

  const msgInputHandler = (e) => {
    setNewMsg(e.target.value);
    e.preventDefault();
  };
  const sendHandler = (e) => {
    privateMessageHandler(newMsg, nickname);
    e.preventDefault();
    setNewMsg("");
  };

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  return (
    <Modal>
      <div className="chatApp__messages" ref={messageEl}>
        {msg.map((m, i) => (
          <div key={i} className={`chatApp__msg`}>
            <PMessage message={m} />
          </div>
        ))}
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
