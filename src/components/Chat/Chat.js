import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Chat.scss";

import useSocket from "../../hooks/useSocket";
import { Cookies } from "react-cookie";

function Chat() {
  const cookies = new Cookies();

  let userInfo = cookies.get("userInfo");

  const [newMsg, setNewMsg] = useState("");
  const { gameId, roomId, chatId } = useParams();

  const { id, userId, avatar, nickname } = userInfo;

  userInfo = { id, userId, avatar, nickname };

  const { joinRoom, sendMessage, messages } = useSocket(
    gameId,
    roomId,
    userInfo
  );

  useEffect(() => {
    joinRoom();
  }, []);

  const msgInputHandler = (e) => {
    setNewMsg(e.target.value);
    e.preventDefault();
  };
  const sendHandler = (e) => {
    e.preventDefault();
    sendMessage(roomId, chatId, userInfo, newMsg);
    setNewMsg("");
  };

  // const onKeyPress = (event) => {
  //   if (event.key === "Enter") sendHandler();
  // };

  return (
    <div className="chat-container">
      <div>
        {messages.map((msg) => {
          return (
            <div className="msg__container">
              <span>{msg.user}</span>
              <span>{msg.body}</span>
            </div>
          );
        })}
      </div>
      <form>
        <input type="text" onChange={msgInputHandler} value={newMsg} />
        <button type="submit" onClick={sendHandler} onKeyPress={sendHandler}>
          send!
        </button>
      </form>
    </div>
  );
}

export default Chat;
