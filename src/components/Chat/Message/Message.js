import React from "react";

import "./Message.scss";

const Message = ({ message }) => {
  const { body, user, mine } = message;
  console.log(mine);

  return mine ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{body}</p>
      </div>
      <p className="sentText pr-10">{user}</p>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <p className="sentText pl-10">{user}</p>
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{body}</p>
      </div>
    </div>
  );
};

export default Message;
