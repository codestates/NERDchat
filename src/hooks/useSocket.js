import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
// import Peer from "peerjs";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const useSocket = (serverName, roomId, userInfo) => {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [NsHeadCount, setNsHeadCount] = useState(0);
  const [roomHeadCount, setRoomHeadCount] = useState(0);
  useEffect(() => {
    socket.current = io(`${ENDPOINT}/${serverName}`, {
      query: { serverName, roomId },
    });

    socket.current.on("welcomeRoom", (userData, msgData) =>
      console.log(userData, msgData)
    );
    socket.current.on("roomMessage", (userData, msgData) => {
      console.log(userData);
      const incomingMsg = {
        body: msgData,
        user: userData.userId,
        mine: userData.userId === userInfo.userId,
      };
      setMessages((prevM) => [...prevM, incomingMsg]);
    });

    // navigator.mediaDevices
    //   .getUserMedia(audioOnlyConfig)
    //   .then((stream) => console.log(stream));

    //현재 nameSpace 접속자 인원 받아오기
    socket.current.on("currentNSLength", (data) => {
      setNsHeadCount(data);
    });
    //현재 룸 접속자 인원 받아오기(수정필요)
    socket.current.on("currentRoomLength", (data) => {
      setRoomHeadCount(data);
    });
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

  return { joinRoom, sendMessage, messages };
};

export default useSocket;
