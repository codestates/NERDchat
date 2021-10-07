import React, { useEffect, useRef } from "react";
import Message from "./Message/Message";
import Input from "../Chat/Input/Input";

import "./Chat.scss";

function Chat({ messages, msgInputHandler, newMsg, sendHandler }) {
  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  return (
    <div className="chatApp">
      <div className="chatApp__chat">
        <div className="chatApp__head"></div>
        <div className="chatApp__messages" ref={messageEl}>
          {messages.map((m, i) => (
            <div key={i} className={`chatApp__msg`}>
              <Message message={m} />
            </div>
          ))}
        </div>
        <div className="chatApp__footer">
          <Input
            msgInputHandler={msgInputHandler}
            newMsg={newMsg}
            sendHandler={sendHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
