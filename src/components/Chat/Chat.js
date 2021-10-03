import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message/Message";
import Input from "../Chat/Input/Input";

import "./Chat.scss";

import useSocket from "../../hooks/useSocket";
import { Cookies } from "react-cookie";

function Chat() {
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
  const [messages, setMessages] = useState([]);
  const { gameId, roomId, chatId } = useParams();
  const { id, userId, avatar, nickname } = userInfo;

  userInfo = { id, userId, avatar, nickname };

  const { socket, joinRoom } = useSocket(gameId, roomId, userInfo);

  useEffect(() => {
    joinRoom();

    socket.current.on("welcomeRoom", (userData, msgData) =>
      console.log(userData, msgData)
    );
    socket.current.on("roomMessage", (userData, msgData) => {
      console.log(userData, msgData);
      const incomingMsg = {
        body: msgData,
        user: userData.userId,
        mine: userData.userId === userInfo.userId,
      };
      setMessages((prevM) => [...prevM, incomingMsg]);
    });

    return () => {
      socket.current.off("welcomeRoom");
      socket.current.off("roomMessage");
    };
  }, [gameId, roomId]);

  const msgInputHandler = (e) => {
    setNewMsg(e.target.value);
    e.preventDefault();
  };
  const sendHandler = (e) => {
    socket.current.emit("roomMessage", roomId, chatId, userInfo, newMsg);
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
