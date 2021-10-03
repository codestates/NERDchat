import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FriendList from "../../components/SideTap/FriendList/FriendList";
import OnlineUser from "../../components/SideTap/OnlineUser/OnlineUser";
import Messenger from "../../components/SideTap/Messenger/Messenger";
import { Context } from "../../context/ContextProvider";
import useDM from "../../hooks/useDM";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

import "./SideBar.scss";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const SideBar = () => {
  // const { friends } = useContext(Context);
  const [toggleState, setToggleState] = useState(1);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  const path = useParams();
  const { userListRef } = useDM(userInfo, path);

  const getFriendsListHandler = async () => {
    const res = await axios.get(`${ENDPOINT}/friends/lists`, {
      withCredentials: true,
    });
    const givenFriends = res.data.data;
    const temp = [];
    for (let i = 0; i < givenFriends.length; i++) {
      for (let j = 0; j < userListRef.current.length; j++) {
        if (givenFriends[i].nickname === userListRef.current[j].nickname) {
          temp.push(userListRef.current[j]);
        }
      }
    }
    setFilteredFriends(temp);
  };
  useEffect(() => {
    setLoading(true);
    getFriendsListHandler();
    setLoading(false);
  }, [loading, toggleState]);

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
            !loading &&
            filteredFriends
              .filter((acc) => acc.userId !== userInfo.userId)
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
                  userInfo={userInfo}
                />
              ))}
          {toggleState === 1 && loading && <Loader />}
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          {toggleState === 2 &&
            userListRef.current
              .sort((a, b) =>
                a.connected === b.connected ? 0 : -a.connected ? -1 : 1
              )
              .filter((el) => el.userId !== userInfo.userId)
              .map((el) => (
                <OnlineUser
                  key={el.userId}
                  avatar={el.avatar}
                  nickname={el.nickname}
                  messages={el.messages}
                  online={el.connected}
                  userInfo={userInfo}
                />
              ))}
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          {/* {toggleState === 3 && (
            <MsgLists userList={userListRef.current} userInfo={userInfo} />
          )} */}
          {toggleState === 3 &&
            userListRef.current
              .sort((a, b) =>
                a.connected === b.connected ? 0 : -a.connected ? -1 : 1
              )
              .filter((user) => user.userId !== userInfo.userId)
              .filter((item) => item.messages.length > 0)
              .map((el) => (
                <Messenger
                  key={el.userId}
                  userInfo={userInfo}
                  avatar={el.avatar}
                  nickname={el.nickname}
                  online={el.connected}
                  messages={el.messages}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
export default SideBar;
