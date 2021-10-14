import React, { useState, useEffect } from "react";
import axios from "axios";
import FriendList from "../../components/SideTap/FriendList/FriendList";
import OnlineUser from "../../components/SideTap/OnlineUser/OnlineUser";
import Messenger from "../../components/SideTap/Messenger/Messenger";
import useDM from "../../hooks/useDM";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
import socket from "../../hooks/socket";
import "./SideBar.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const SideBar = () => {
  // const { friends } = useContext(Context);
  const [toggleState, setToggleState] = useState(1);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({
    data: { name1: { message: [], read: false } },
  });
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const path = useParams(); //{gameId: num}
  const { userListRef } = useDM(userInfo, path);
  const [msgLists, setMsgLists] = useState(userListRef.current);

  const getFriendsListHandler = async () => {
    if (!localStorage.getItem("nerd-logged-in")) return;
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
    const delayReq = setTimeout(() => {
      getFriendsListHandler();
      setLoading(false);
    }, 200);

    return () => clearTimeout(delayReq);
  }, []);

  useEffect(() => {
    socket.emit("users");
  }, [toggleState]);

  useEffect(() => {
    socket.on("users", (data) => {
      setMsgLists(data);
    });
  }, [toggleState]);

  useEffect(() => {
    //본인이 보낸 메시지는 아래 이벤트가 발생하지 않음
    //i.e. 보낼때 직접 state에 넣어줘야 바로 반영이 된다.
    socket.on(
      "private message",
      async ({ content, from, to, invite, friend }) => {
        //from: 보낸사람 // to: 현재 사용유저
        const incomingM = { content, from, to, invite, friend };
        setMsg((prev) => {
          const temp = { ...prev.data };
          //보낸사람의 닉네임이 없을때(즉, 새로운유저한테서 새로운 메시지 받았을때)
          if (!temp[from]) {
            //새롭게 하나 만들고,
            temp[from] = { messages: [incomingM], read: false };
            return { data: temp };
          } else {
            //이미 이전에 대화한 내역이 있다면
            if (!temp[from].messages) {
              temp[from].messages = [];
            }
            temp[from].messages.push(incomingM);
            temp[from].read = false;
            return { data: temp };
          }
        });
      }
    );

    return () => {
      socket.off("private message");
      // socket.off("users");
    };
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const sendMsgHandler = (msg, from, to) => {
    // socket.emit('private message'){
    // }
    setMsg((prev) => {
      const temp = { ...prev.data }; //temp= {name1: {message: [], read: t/f}}
      //보낸사람의 닉네임이 없을때(즉, 새로운유저한테서 새로운 메시지 받았을때)

      if (!temp[to]) {
        //새롭게 하나 만들고,
        temp[to] = { messages: [msg], read: true };
        return { data: temp };
      } else {
        //이미 이전에 대화한 내역이 있다면
        if (temp[to].messages) {
          temp[to].messages.push(msg);
          temp[to].read = true;
        } else {
          temp[to] = { messages: [msg], read: true };
        }
        return { data: temp };
      }
    });
  };
  const readMsgHandler = (from) => {
    setMsg((prev) => {
      const temp = { ...prev.data };
      temp[from] = { ...temp[from], read: true };
      return { data: temp };
    });
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
                  userId={el.userId}
                  messages={el.messages}
                  online={el.connected}
                  userInfo={userInfo}
                  userId={el.userId}
                  sendMsgHandler={sendMsgHandler}
                  readMsgHandler={readMsgHandler}
                  msg={msg}
                />
              ))}
          {/* {toggleState === 1 && loading && <Loader />} */}
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          {toggleState === 2 &&
            userListRef.current
              .filter(
                (el) =>
                  el.userId !== userInfo.userId &&
                  el.nickname !== "" &&
                  el.connected
              )
              .map((el) => (
                <OnlineUser
                  key={el.userId}
                  avatar={el.avatar}
                  nickname={el.nickname}
                  messages={el.messages}
                  online={el.connected}
                  userId={el.userId}
                  userInfo={userInfo}
                  sendMsgHandler={sendMsgHandler}
                  readMsgHandler={readMsgHandler}
                  msg={msg}
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
            msgLists
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
                  userId={el.userId}
                  messages={el.messages}
                  sendMsgHandler={sendMsgHandler}
                  readMsgHandler={readMsgHandler}
                  msg={msg}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
export default SideBar;
