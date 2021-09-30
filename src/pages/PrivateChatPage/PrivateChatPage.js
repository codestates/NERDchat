import React from "react";

import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../UI/SideBar/SideBar";
import Chat from "../../components/Chat/Chat";
import DMChat from "../../components/DMChat/DMChat";
import ChatHeader from "../../components/ChatHeader/ChatHeader";

import "./PrivateChatPage.scss";

function PrivateChatPage(props) {
  console.log(1111, "from private chat page", props);
  // const { messages, nickname } = props.location.state;
  const { toId } = props.match.params;
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
              <DMChat to={toId} />
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
