import { useEffect, useRef } from "react";
import Modal from "../../UI/modal/Modal";
import PMessage from "./PMessage/PMessage";
import PInput from "./PInput/PInput";
import socket from "../../hooks/socket";

function PrivateMessageModal({
  userInfo,
  nickname,
  setMsg,
  messages,
  readHandler,
}) {
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
  }, [messages]);

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
    if (e.target.value.length === 0) return;
    else {
      setMsg(sendingM, nickname);
    }
  };

  return (
    <Modal>
      <div className="chatApp__messages" ref={messageEl}>
        {messages.map((m, i) => (
          <div key={i} className={`chatApp__msg`}>
            <PMessage
              message={m}
              nickname={nickname}
              userInfo={userInfo}
              setMsg={setMsg}
              readHandler={readHandler}
            />
          </div>
        ))}
        <div ref={newMessageEl} />
      </div>
      <div>
        <PInput sendHandler={sendHandler} />
      </div>
    </Modal>
  );
}

export default PrivateMessageModal;
