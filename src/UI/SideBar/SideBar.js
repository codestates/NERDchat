import React, { useState, useEffect } from "react";
import FriendList from "../../components/SideTap/FriendList/FriendList";
import axios from "axios";
import Messenger from "../../components/SideTap/Messenger/Messenger";
import OnlineUser from "../../components/SideTap/OnlineUser/OnlineUser";
import useDM from "../../hooks/useDM";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

import "./SideBar.scss";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const SideBar = () => {
  const [toggleState, setToggleState] = useState(1);
  const [friends, setFriends] = useState([]);

  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");

  const { gameId } = useParams();
  const { userList } = useDM(gameId, userInfo);
  // let temp = userList.filter((el) => el !== undefined && el.connected === true);
  let trueUsers = [
    {
      id: "loading",
      avatar: "loading",
      nickname: "loading",
      messages: [],
    },
  ];
  // trueUsers = temp.filter((el, idx) => {
  //   let Fidx = temp.findIndex((item) => el.userId === item.userId);
  //   if (Fidx === idx) return el;
  // });

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/friends/lists`, { withCredentials: true })
      .then((res) => setFriends(res.data.data));
  }, []);

  // useEffect(() => {
  //   console.log("This is online 1", userList);
  //   let temp = userList.filter((el) => el.connected === true);
  //   let trueUsers = temp.map((el, idx) => {
  //     let Fidx = temp.findIndex((item) => item.userId === el.userId);
  //     if (Fidx === idx) return el;
  //   });
  //   setOnline(trueUsers);
  // }, []);
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
          trueUsers.map((el, idx) => {
            return (
              <OnlineUser
                key={el.userId}
                avatar={null}
                nickname={el.nickname}
                messages={el.messages}
              />
            );
          })}
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
