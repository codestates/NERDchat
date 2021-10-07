import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../UI/SideBar/SideBar";
import Chat from "../../components/Chat/Chat";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import Voice from "../../components/Chat/Voice/Voice";
import "./ChatPage.scss";

const ChatPage = (props) => {
  const path = useParams();
  const { roomTitle } = props.location.state;
  return (
    <div className="chatpage-container">
      <div className="chatpage-nav">
        <NavBar />
      </div>
      <div className="chatpage-main">
        <div className="chatpage-main-container">
          <div className="chatpage-main-header">
            <ChatHeader path={path} roomTitle={roomTitle} />
          </div>
          <div className="chatpage-main-content">
            <div className="chatpage-chat">
              <Chat />
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
