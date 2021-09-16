import React from "react";

import "./ChatPage.scss";

const ChatPage = () => {
  return (
    <div className="chatpage-container">
      <div className="chatpage-nav">
        <h1>나는 나브</h1>
      </div>
      <div className="chatpage-main">
        <div className="chatpage-main-content">
          <div className="chatpage-chat">chat</div>
          <div className="chatpage-vioce">voice</div>
        </div>
        <div className="chatpage-sidebar">sidebar</div>
      </div>
    </div>
  );
};

export default ChatPage;
