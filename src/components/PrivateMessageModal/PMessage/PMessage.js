import React, { useState } from "react";
import { Cookies } from "react-cookie";
import { IoEllipseSharp } from "react-icons/io5";

import "./PMessage.scss";

const PMessage = (message) => {
  console.log(message);
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  let mine = message.message.from === userInfo.userId;
  const fromMe = message.message.from;

  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();

  const [currentTime] = useState(time);

  return mine ? (
    <>
      <div className="fromcurrent__container">
        <div className="fromcurrent__time">{currentTime}</div>
        <div className="fromcurrent__name">
          {fromMe}
          <IoEllipseSharp size={8} className="onlines" />
        </div>
      </div>
      <div className="fromcurrent__body-container">
        <div className="fromcurrent__body">{message.message.content}</div>
      </div>
    </>
  ) : (
    <>
      <div className="touser__container">
        <div className="touser__name">
          <IoEllipseSharp size={8} className="onliness" />
          {fromMe}
        </div>
        <span className="touser__time">{currentTime}</span>
      </div>
      <div className="touser__body-container">
        <div className="touser__body">{message.message.content}</div>
      </div>
    </>
  );
};

export default PMessage;
