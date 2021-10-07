import { useEffect, useRef } from "react";

import socket from "./socket";

function useDM(userInfo, to) {
  const userListRef = useRef([]);
  const { userId, nickname, avatar } = userInfo;

  useEffect(() => {
    const token = localStorage.getItem(`socketToken${userId}`);
    if (token) {
      socket.auth = { token, nickname, userId, avatar };
      socket.connect();
    } else {
      socket.auth = { nickname, userId, avatar };
      socket.connect();
    }

    socket.on("token", ({ token, userId }) => {
      socket.auth = { ...socket.auth, token };
      socket.userId = userId;
      localStorage.setItem(`socketToken${userId}`, token);
    });

    socket.on("connect", () => {
      for (let i = 0; i < userListRef.current.length; i++) {
        const existingUser = userListRef.current[i];
        if (existingUser.userId === userId) {
          existingUser.connect = true;
        }
      }
    });

    socket.on("disconenct", () => {
      for (let i = 0; i < userListRef.current.length; i++) {
        const existingUser = userListRef.current[i];
        if (existingUser.userId === userId) {
          existingUser.connect = false;
        }
      }
    });

    socket.on("user connected", (data) => {
      for (let i = 0; i < userListRef.current.length; i++) {
        const existingUser = userListRef.current[i];
        if (existingUser.userId === data.userId) {
          existingUser.connected = true;
          return;
        }
      }
      userListRef.current.push(data);
    });

    socket.on("users", (data) => {
      data.forEach((serverUser) => {
        for (let i = 0; i < userListRef.current.length; i++) {
          const existingUser = userListRef.current[i];
          if (existingUser.userId === serverUser.userId) {
            existingUser.connected = serverUser.connected;
            existingUser.messages = serverUser.messages;
            return;
          }
        }
        userListRef.current.push(serverUser);
      });
    });

    socket.on("user disconnected", (data) => {
      for (let i = 0; i < userListRef.current.length; i++) {
        const existingUser = userListRef.current[i];
        if (existingUser.userId === data) {
          existingUser.connected = false;
          return;
        }
      }
      return;
    });

    return () => {
      socket.off("connect");
      socket.off("token");
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("disconenct");
      socket.disconnect();
    };
  }, [to]);

  return { userListRef };
}

export default useDM;
