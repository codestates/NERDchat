import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

import Peer from "peerjs";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const useSocket = (serverName, roomId, userInfo) => {
  const [messages, setMessages] = useState([]);
  const [nsHeadCount, setNsHeadCount] = useState(0);
  const [roomHeadCount, setRoomHeadCount] = useState(0);
  const [userList, setUserList] = useState([]);

  const socket = useRef();
  const myPeer = new Peer();

  const { nickname, userId } = userInfo;
  const users = [];

  useEffect(() => {
    if (userId) {
      socket.current = io(`${ENDPOINT}/${serverName}`, {
        autoConnect: false,
      });

      const token = localStorage.getItem(`socketToken${userId}`);
      socket.current.roomId = roomId ? roomId : null;

      socket.current.on("connect", () => {
        users.forEach((el) => {
          if (el.userId === userId) {
            el.connected = true;
          }
        });
      });

      if (token) {
        socket.current.auth = { token, nickname, userId };
        socket.current.connect();
      } else {
        socket.current.auth = { nickname, userId };
        socket.current.connect();
      }

      socket.current.on("token", ({ token, userId }) => {
        socket.current.auth = { token };
        localStorage.setItem(`socketToken${userId}`, token);
        socket.current.userId = userId;
      });

      socket.current.on("users", (data) => {
        data.forEach((el) => {
          users.push(el);
        });
        users.sort((a, b) => {
          return a - b;
        });
        setUserList(users);
      });

      socket.current.on("user connected", (data) => {
        for (let i = 0; i < users.length; i++) {
          const existingUser = users[i];
          if (existingUser.userId === data.userId) {
            existingUser.connected = true;
            return;
          }
        }
        users.push(data);
      });

      socket.current.on("user disconnected", (data) => {
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          if (user.userId === data) {
            user.connected = false;
            break;
          }
        }
      });

      socket.current.on("disconenct", () => {
        users.forEach((el) => {
          if (el.userId === userId) {
            el.connected = false;
          }
        });
      });

      //현재 nameSpace 접속자 인원 받아오기
      socket.current.on("serverSize", (data) => {
        setNsHeadCount(data / 2);
      });
      socket.current.emit("currentNSLength", "", (data) => {
        console.log("This is emit from client", data);
      });
      //현재 룸 접속자 인원 받아오기(수정필요)
      socket.current.on("currentRoomLength", (data) => {
        setRoomHeadCount(data);
      });

      return () => {
        socket.current.off("connect");
        socket.current.off("token");
        socket.current.off("users");
        socket.current.off("user connected");
        socket.current.off("user disconnected");
        socket.current.off("disconenct");
        socket.current.off("currentNSLength");
        socket.current.off("currentRoomLength");
      };
    }
  }, [serverName, roomId]);

  const joinRoom = () => {
    myPeer.on("open", (peerId) => {
      socket.current.emit("joinRoom", roomId, userInfo, peerId);
    });
  };

  // const getUserHead = () => {
  //   socket.current.emit("serverSize", () => {
  //     socket.current.on("serverSize", (data) => {
  //       console.log(data);
  //     });
  //   });
  // };

  return {
    socket,
    joinRoom,
    messages,
    nsHeadCount,
    userList,
    // getUserHead,
  };
};

export default useSocket;
