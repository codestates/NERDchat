import React, { useState, useEffect } from "react";

import FriendList from "../../components/SideTap/FriendList/FriendList";
import OnlineUser from "../../components/SideTap/OnlineUser/OnlineUser";
import Messenger from "../../components/SideTap/Messenger/Messenger";

import axios from "axios";
import useDM from "../../hooks/useDM";

import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

import "./SideBar.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const SideBar = () => {
  const [toggleState, setToggleState] = useState(1);
  const [friends, setFriends] = useState([]);

  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  const path = useParams();

  const { userListRef } = useDM(userInfo, path);

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
          {toggleState === 1 &&
            friends.map((el) => (
              <FriendList
                key={el.id}
                avatar={el.avatar}
                nickname={el.nickname}
              />
            ))}
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          {toggleState === 2 &&
            userListRef.current.map((el) => {
              if (el.userId !== userInfo.userId) {
                return (
                  <OnlineUser
                    key={el.userId}
                    avatar={el.avatar}
                    nickname={el.nickname}
                    messages={el.messages}
                  />
                );
              }
            })}
        </div>

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
