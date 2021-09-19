import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import Message from "./Message/Message";
import "./Chat.scss";
import { useParams } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import { Context } from "../../context/ContextProvider";
import Peer from "peerjs";

function Chat(props) {
  console.log(props)
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const myPeer = new Peer();
  const { gameId, roomId, chatId } = useParams();
  const ctx = useContext(Context);
  const { id, userId, avatar, nickname } = ctx.userInfo;
  const userInfo = { id, userId, avatar, nickname };
  // console.log('This is Chat', userInfo);
  const { joinRoom, message, sendMessage, getMessage } = useSocket(
    gameId,
    roomId,
    userInfo
  );
  useEffect(() => {
    joinRoom();
    // getMessage();
  }, []);
  const msgInputHandler = (e) => {
    setNewMsg(e.target.value);
  };
  const sendHandler = () => {
    console.log("clicked");
    sendMessage(roomId, chatId, userInfo, newMsg);
  };
  return (
    <div className="chat-container">
      <Message />
      <input type="text" onChange={msgInputHandler} value={newMsg} />
      <button onClick={sendHandler}>send!</button>
    </div>
  );
}

export default Chat;