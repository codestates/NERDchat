import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FriendList from "../../components/SideTap/FriendList/FriendList";
import OnlineUser from "../../components/SideTap/OnlineUser/OnlineUser";
import Messenger from "../../components/SideTap/Messenger/Messenger";

import useDM from "../../hooks/useDM";

import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

import "./SideBar.scss";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const SideBar = () => {
  const [toggleState, setToggleState] = useState(1);
  // const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  const mySet = new Set(friends);

  const path = useParams();
  const { userListRef, privateMessageHandler, msg } = useDM(userInfo, path);

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/friends/lists`, { withCredentials: true })
      .then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          for (let j = 0; j < userListRef.current.length; j++) {
            if (res.data.data[i].nickname === userListRef.current[j].nickname) {
              setFriends((prev) => [...prev, userListRef.current[j]]);
            }
          }
        }
      });
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
          {toggleState === 1 &&
            friends
              .filter(
                (acc) => acc.userId !== userInfo.userId && acc.nickname !== ""
              )
              .sort((a, b) =>
                a.connected === b.connected ? 0 : -a.connected ? -1 : 1
              )
              .map((el) => (
                <FriendList
                  key={el.userId}
                  avatar={el.avatar}
                  nickname={el.nickname}
                  messages={el.messages}
                  online={el.connected}
                  privateHandler={privateMessageHandler}
                  msg={msg}
                />
              ))}
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          {toggleState === 2 &&
            userListRef.current
              .sort((a, b) =>
                a.connected === b.connected ? 0 : -a.connected ? -1 : 1
              )
              .filter(
                (acc) => acc.userId !== userInfo.userId && acc.nickname !== ""
              )
              .map((el) => (
                <OnlineUser
                  key={el.userId}
                  avatar={el.avatar}
                  nickname={el.nickname}
                  messages={el.messages}
                  online={el.connected}
                  privateHandler={privateMessageHandler}
                  msg={msg}
                />
              ))}
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          {toggleState === 3 &&
            userListRef.current
              .sort((a, b) =>
                a.connected === b.connected ? 0 : -a.connected ? -1 : 1
              )
              .filter(
                (acc) => acc.userId !== userInfo.userId && acc.nickname !== ""
              )
              .map((el) => (
                <Messenger
                  key={el.userId}
                  avatar={el.avatar}
                  nickname={el.nickname}
                  messages={el.messages}
                  online={el.connected}
                  privateHandler={privateMessageHandler}
                  msg={msg}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
export default SideBar;
