import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message/Message";
import Input from "../Chat/Input/Input";

import "./Chat.scss";

import useSocket from "../../hooks/useSocket";
import { Cookies } from "react-cookie";

function Chat() {
  const audioList = useRef();
  const audioRef = useRef();
  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  const cookies = new Cookies();

  let userInfo = cookies.get("userInfo");
  const [newMsg, setNewMsg] = useState("");
  const { gameId, roomId, chatId } = useParams();

  const { id, userId, avatar, nickname } = userInfo;

  userInfo = { id, userId, avatar, nickname };

  const { joinRoom, sendMessage, messages } = useSocket(
    gameId,
    roomId,
    userInfo,
    audioList,
    audioRef
  );

  useEffect(() => {
    joinRoom();
  }, [joinRoom]);

  const msgInputHandler = (e) => {
    setNewMsg(e.target.value);
    e.preventDefault();
  };
  const sendHandler = (e) => {
    sendMessage(roomId, chatId, userInfo, newMsg);
    e.preventDefault();
    setNewMsg("");
  };

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
        {/* <div ref={audioList}>
          <audio ref={audioRef}>mute</audio>
        </div> */}
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
