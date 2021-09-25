import React, { useState, useEffect } from "react";
import { IoEllipseSharp } from "react-icons/io5";

import "./Message.scss";

const Message = ({ message }) => {
  const { body, user, mine } = message;

  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();

  const [currentTime, setCurrentTime] = useState(time);

  return mine ? (
    <>
      <div className="current__container">
        <div className="current__time">{currentTime}</div>
        <div className="current__name">
          {user}
          <IoEllipseSharp size={8} className="onlines" />
        </div>
      </div>
      <div className="current__body-container">
        <div className="current__body">{body}</div>
      </div>
    </>
  ) : (
    <>
      <div className="user__container">
        <div className="user__name">
          <IoEllipseSharp size={8} className="onliness" />
          {user}
        </div>
        <span className="user__time">{currentTime}</span>
      </div>
      <div className="user__body-container">
        <div className="user__body">{body}</div>
      </div>
    </>
  );
};

export default Message;
