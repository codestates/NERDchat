import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import useSocket from "../../hooks/useSocket";
import { Cookies } from "react-cookie";

import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../UI/SideBar/SideBar";
import Chat from "../../components/Chat/Chat";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import Voice from "../../components/Chat/Voice/Voice";
import "./ChatPage.scss";

const ChatPage = (props) => {
  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");
  const history = useHistory();

  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const { gameId, roomId, chatId } = useParams();

  const { id, userId, avatar, nickname } = userInfo;
  userInfo = { id, userId, avatar, nickname };

  const { socket, joinRoom } = useSocket(gameId, roomId, userInfo);
  useEffect(() => {
    joinRoom();

    socket.current.on("roomMessage", (userData, msgData) => {
      const incomingMsg = {
        body: msgData,
        user: userData.userId,
        mine: userData.userId === userInfo.userId,
      };
      setMessages((prevM) => [...prevM, incomingMsg]);
    });

    socket.current.on("welcomeRoom", (data) => {
      const len = data.length;
      setCurrentUser(len);
    });
    socket.current.on("fullRoom", () => {
      history.goBack(-1);
    });

    return () => {
      socket.current.off("welcomeRoom");
      socket.current.off("roomMessage");
      socket.current.off("fullRoom");
      socket.current.disconnect();
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

  const { roomTitle } = props.location.state;

  return (
    <div className="chatpage-container">
      <div className="chatpage-nav">
        <NavBar />
      </div>
      <div className="chatpage-main">
        <div className="chatpage-main-container">
          <div className="chatpage-main-header">
            <ChatHeader roomTitle={roomTitle} currentUser={currentUser} />
          </div>
          <div className="chatpage-main-content">
            <div className="chatpage-chat">
              <Chat
                messages={messages}
                msgInputHandler={msgInputHandler}
                newMsg={newMsg}
                sendHandler={sendHandler}
              />
            </div>
            <div className="chatpage-vioce">
              <Voice />
            </div>
          </div>
        </div>
        <div className="chatpage-sidebar">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
