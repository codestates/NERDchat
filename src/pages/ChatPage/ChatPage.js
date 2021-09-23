import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../UI/SideBar/SideBar";
import Chat from "../../components/Chat/Chat";
import Input from "../../components/Chat/Input/Input";
import ChatHeader from "../../components/ChatHeader/ChatHeader";

import "./ChatPage.scss";

const ChatPage = () => {
  return (
    <div className="chatpage-container">
      <div className="chatpage-nav">
        <NavBar />
      </div>
      <div className="chatpage-main">
        <div className="chatpage-main-container">
          <div className="chatpage-main-header">
            <ChatHeader />
          </div>
          <div className="chatpage-main-content">
            <div className="chatpage-chat">
              <Chat />
            </div>
            <div className="chatpage-vioce">voice</div>
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
