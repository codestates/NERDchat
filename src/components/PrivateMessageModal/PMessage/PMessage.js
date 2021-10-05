import React, { useState } from "react";
import { IoEllipseSharp } from "react-icons/io5";
import axios from "axios";
import socket from "../../../hooks/socket";
import "./PMessage.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const PMessage = ({ message, userInfo, setMsg }) => {
  const { content, to, from, invite, friend } = message;
  let mine = from === userInfo.userId;

  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();

  const [currentTime] = useState(time);

  //승낙버튼
  const acceptFriendHandler = async (e) => {
    const res = await axios.post(`${ENDPOINT}/friends/accept/${from}`, true, {
      withCredentials: true,
    });
    socket.emit("private message", {
      content: `${from} 님의 친구 요청을 승낙하였습니다.`,
      to: from,
    });
    const incomingM = {
      content: `${from} 님의 친구 요청을 승낙하였습니다.`,
      from: userInfo.userId,
      to: from,
    };

    setMsg(incomingM, userInfo.userId, from);

    e.preventDefault();
  };

  //거절버튼
  const denyFriendHandler = async (e) => {
    const res = await axios.post(`${ENDPOINT}/friends/accept/${from}`, false, {
      withCredentials: true,
    });
    socket.emit("private message", {
      content: `${from}님의 친구 요청을 거절 하였습니다.`,
      to: from,
    });
    const incomingM = {
      content: `${from}님의 친구 요청을 거절하였습니다.`,
      from: userInfo.userId,
      to: from,
    };
    // setMsg((prev) => [...prev, incomingM]);
    setMsg(incomingM, userInfo.userId, from);

    e.preventDefault();
  };

  return mine ? (
    //내가 보낸 메시지
    <>
      <div className="fromcurrent__container">
        <div className="fromcurrent__time">{currentTime}</div>
        <div className="fromcurrent__name">
          {from}
          <IoEllipseSharp size={8} className="onlines" />
        </div>
      </div>
      <div className="fromcurrent__body-container">
        <div className="fromcurrent__body">
          {invite && !friend ? <a href={content}>{content}</a> : content}
        </div>
      </div>
    </>
  ) : (
    //남이 보낸 메시지
    <>
      <div className="touser__container">
        <div className="touser__name">
          <IoEllipseSharp size={8} className="onliness" />
          {from}
        </div>
        <span className="touser__time">{currentTime}</span>
      </div>
      <div className="touser__body-container">
        <div className="touser__body">
          {!invite && !friend && <p>{content}</p>}
          {invite === 1 && <a href={content}>{content}</a>}
          {friend === 1 && (
            <>
              <p>{content}</p>
              <div className="friend__req__button__container">
                <button onClick={acceptFriendHandler}>YES</button>
                <button onClick={denyFriendHandler}>NO</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PMessage;
