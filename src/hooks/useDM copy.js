import { useEffect, useState, useRef } from "react";

import socket from "./socket";

function useDM(userInfo, to) {
  const userListRef = useRef([]);
  const { userId, nickname, avatar } = userInfo;
  const [msgLists, setMsgLists] = useState([]);
  useEffect(() => {
    socket.on("private message", (message) => {
      setMsgLists(message);
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
