import React from "react";

import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../UI/SideBar/SideBar";
import Chat from "../../components/Chat/Chat";
import ChatHeader from "../../components/ChatHeader/ChatHeader";

import "./PrivateChatPage.scss";

function PrivateChatPage() {
  return (
    <div className="private__container">
      <div className="private__nav">
        <NavBar />
      </div>
      <div className="private__main">
        <div className="private__main-container">
          <div className="private__main-header">
            <ChatHeader />
          </div>
          <div className="private__main-content">
            <div className="private__chat">
              <Chat />
            </div>
          </div>
        </div>
        <div className="private__sidebar">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default PrivateChatPage;
