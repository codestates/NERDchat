import React, { useState, useEffect } from "react";
import FriendList from "../../components/SideTap/FriendList/FriendList";
import axios from "axios";

import Messenger from "../../components/SideTap/Messenger/Messenger";
import OnlineUser from "../../components/SideTap/OnlineUser/OnlineUser";

import { Context } from "../../context/ContextProvider";
import useSocket from "../../hooks/useSocket";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

import "./SideBar.scss";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const SideBar = () => {
  const [toggleState, setToggleState] = useState(1);
  const [friends, setFriends] = useState([]);

  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");

  const { gameId, roomId, chatId } = useParams();

  const { userList } = useSocket(gameId, roomId, userInfo, "", "");
  let temp = userList.filter((el) => el.connected === true);
  let trueUsers = temp.map((el, idx) => {
    let Fidx = temp.findIndex((item) => item.userId === el.userId);
    if (Fidx === idx) return el;
  });
  // console.log(11111, trueUsers);
  useEffect(() => {
    axios
      .get(`${ENDPOINT}/friends/lists`, { withCredentials: true })
      .then((res) => setFriends(res.data.data));
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="sidebar-container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          FRIEND
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          ONLINE
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          MESSAGE
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          {friends.map((el) => (
            <FriendList key={el.id} avatar={el.avatar} nickname={el.nickname} />
          ))}
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        ></div>
        {toggleState === 2 &&
          trueUsers.map((el) => (
            <OnlineUser
              key={el.id}
              avatar={el.avatar}
              nickname={el.nickname}
              messages={el.messages}
            />
          ))}
        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          {toggleState === 3 && <Messenger />}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
