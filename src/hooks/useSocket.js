import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
// import Peer from "peerjs";

const useSocket = (serverName, roomId, userInfo) => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io(`http://localhost:8080/${serverName}`, {
      query: { serverName, roomId },
    });

    socket.current.on("welcomeRoom", (userData, msgData) =>
      console.log(userData, msgData)
    );

    // navigator.mediaDevices
    //   .getUserMedia(audioOnlyConfig)
    //   .then((stream) => console.log(stream));

    return () => {
      socket.current.close();
      socket.current.disconnect();
    };
  }, []);

  const joinRoom = () => {
    socket.current.emit("joinRoom", roomId, 1234, userInfo, "welcome!!!");
  };

  const sendMessage = (roomId, chatId, userInfo, newMsg) => {
    socket.current.emit("roomMessage", roomId, chatId, userInfo, newMsg);
  };

  const getMessage = () => {
    socket.current.on("roomMessage", (data) => {
      console.log(data);
    });
  };
  return { joinRoom, sendMessage, getMessage };
};

export default useSocket;
