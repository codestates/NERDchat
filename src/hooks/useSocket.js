import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const useSocket = (serverName, roomId, userInfo) => {
  const socket = useRef();
  const peer = new Peer();
  const [messages, setMessages] = useState([]);
  const [peerId, setPeerId] = useState(null);
  const [stream, setStream] = useState();
  const [NsHeadCount, setNsHeadCount] = useState(0);
  const [roomHeadCount, setRoomHeadCount] = useState(0);

  const audioOnlyConfig = {
    video: false,
    audio: true,
  };
  const userMediaConfig = {
    audio: { echoCancellation: true, noiseSuppression: true },
    video: { facingMode: "user" },
  };

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
    //   .then((stream) => setStream(stream), setPeerId(stream.id));

    socket.current.on("userConnect", (data) => {
      console.log(data);
    });

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

  // const voiceChat = () => {
  //   socket.current.emit("voiceChat", 1234, userInfo, peerId);
  // };

  return { joinRoom, sendMessage, messages };
};

export default useSocket;
