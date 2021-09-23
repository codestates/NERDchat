import React from "react";

import "./Message.scss";

const Message = ({ message, userNickname, nickname }) => {
  let currentUser = false;

  if (userNickname === nickname) {
    currentUser = true;
  }

  console.log(userNickname, nickname);
  return (
    currentUser && (
      <div>
        {userNickname}: {message.message}
      </div>
    )
  );
};

export default Message;
