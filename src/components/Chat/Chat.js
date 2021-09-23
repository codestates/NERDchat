import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Chat.scss";

import useSocket from "../../hooks/useSocket";
import { Cookies } from "react-cookie";

function Chat() {
  const cookies = new Cookies();

  let userInfo = cookies.get("userInfo");

  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const { gameId, roomId, chatId } = useParams();

  const { id, userId, avatar, nickname } = userInfo;

  userInfo = { id, userId, avatar, nickname };

  const { joinRoom, sendMessage, getMessage } = useSocket(
    gameId,
    roomId,
    userInfo
  );

  useEffect(() => {
    joinRoom();
    getMessage();
  }, []);

  const msgInputHandler = (e) => {
    setNewMsg(e.target.value);
    e.preventDefault();
  };
  const sendHandler = (e) => {
    sendMessage(roomId, chatId, userInfo, newMsg);
    e.preventDefault();
  };

  // const onKeyPress = (event) => {
  //   if (event.key === "Enter") sendHandler();
  // };

  return (
    <div className="chat-container">
      <div></div>
      <form>
        <input type="text" onChange={msgInputHandler} value={newMsg} />
        <button type="submit" onClick={sendHandler}>
          send!
        </button>
      </form>
    </div>
  );
}

export default Chat;
