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
  const [toggleState, setToggleState] = useState(1);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const path = useParams();
  const { userListRef } = useDM(userInfo, path);
  const [msgLists, setMsgLists] = useState(userListRef.current);
  const [lastMsg, setLastMsg] = useState([]); //읽음 여부 상태 관리

  //get 친구리스트 함수
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

  //친구리스트 함수실행
  useEffect(() => {
    setLoading(true);
    const delayReq = setTimeout(() => {
      getFriendsListHandler();
      setLoading(false);
    }, 200);
    return () => clearTimeout(delayReq);
  }, [toggleState]);

  //사이드탭 바뀔때마다 users업데이트
  useEffect(() => {
    socket.emit("users");
    socket.on("users", (data) => {
      setMsgLists(data);
    });
  }, [toggleState]);

  useEffect(() => {
    socket.on(
      "private message",
      async ({ content, from, to, invite, friend }) => {
        //from: 보낸사람 // to: 대상자
        const incomingM = { content, from, to, invite, friend };
        const mine = from === userInfo.nickname;
        const updated = [...msgLists];
        updated.forEach((user) => {
          if (mine && user.nickname === to) {
            user.messages.push(incomingM);
          } else if (!mine && user.nickname === from) {
            user.messages.push(incomingM);
          }
        });
        setMsgLists(updated);
        //남의 것일때 읽음표시 상태 flase만들기
        const lastUpdated = [...lastMsg];
        for (let i = 0; i < lastUpdated.length; i++) {
          if (!mine && lastUpdated[i].nickname === from) {
            lastUpdated[i].read = false;
            break;
          }
          if (i === lastUpdated.length - 1) {
            lastUpdated.push({ nickname: from, read: false });
          }
        }
        if (lastUpdated.length === 0)
          lastUpdated.push({ nickname: from, read: false });
        setLastMsg(lastUpdated);
      }
    );

    return () => {
      socket.off("private message");
    };
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const sendMsgHandler = (msg, to) => {
    socket.emit("private message", {
      content: msg.content,
      to: msg.to,
      invite: msg.invite,
      friend: msg.friend,
    });
    //내가 보내는 것이니 무조건 to에 저장 하면 된다.
    //읽음표시 상태 true만들기
    const lastUpdated = [...lastMsg];
    lastUpdated.forEach((m) => {
      if (m.nickname === to) m.read = false;
    });
    setLastMsg(lastUpdated);

    //메시지리스트 최신화
    const updated = [...msgLists];
    updated.forEach((user) => {
      if (user.nickname === to) {
        user.messages.push(msg);
      }
      return setMsgLists(updated);
    });
  };

  const readHandler = (nickname) => {
    const copied = [...lastMsg];
    for (let i = 0; i < copied.length; i++) {
      if (copied[i].nickname === nickname) {
        copied[i].read = true;
        break;
      }
    }
    setLastMsg(copied);
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
                  readHandler={readHandler}
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
                  readHandler={readHandler}
                />
              ))}
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
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
                  lastMsg={lastMsg}
                  readHandler={readHandler}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
export default SideBar;
