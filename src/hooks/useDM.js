import { useEffect, useState, useRef } from "react";

import socket from "./socket";

function useDM(userInfo, to) {
  console.log(777, "This is info", userInfo);
  const [msg, setMsg] = useState({});
  const [test, setTest] = useState({});
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
      console.log(data);
      data.forEach((serverUser) => {
        for (let i = 0; i < userListRef.current.length; i++) {
          const existingUser = userListRef.current[i];
          // if (serverUser.userId === to) {
          //   setMsg(serverUser.messages);
          //   console.log(msg);
          // }
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

    // socket.on("private message", (message) => {
    //   for (let i = 0; i < userListRef.current.length; i++) {
    //     const existingUser = userListRef.current[i];
    //     if (existingUser.userId === message.to) {
    //       existingUser.messages.push(message);
    //       const name = message.to;
    //       setMsg(() => {
    //         let temp = { ...msg };
    //         if (temp[name]) {
    //           temp[name].push(message);
    //         } else {
    //           temp[name] = [message];
    //         }
    //         return temp;
    //       });

    //       console.log("This is from useDm, ", msg);
    //       return;
    //     }
    //   }
    // });

    // {id1: [{content from to}, id2: ]}

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

  return { userListRef, msg };
}

export default useDM;
