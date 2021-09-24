import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const useSocket = (serverName, roomId, userInfo) => {
  const socket = useRef();
  const myPeer = new Peer();
  const audioList = useRef();
  const audioref = useRef();
  const [messages, setMessages] = useState([]);
  const [nsHeadCount, setNsHeadCount] = useState(0);
  const [roomHeadCount, setRoomHeadCount] = useState(0);

  const voiceChatUid = roomId + "-vUid" + Math.floor(Math.random() * 100);
  console.log("This is voiceChatUid, ", voiceChatUid);
  // const addAudioStream = (audio, stream) => {
  //   audio.srcObject = stream;
  //   audio.addEvent
  // };
  useEffect(() => {
    socket.current = io(`${ENDPOINT}/${serverName}`);
    if (roomId) {
      socket.current.emit(
        "joinRoom",
        roomId,
        voiceChatUid,
        userInfo,
        "welcome!!!"
      );
    }
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
    //   .getUserMedia({ video: false, audio: true })
    //   .then((stream) => {
    //     myPeer.on("call", (call) => call.answer(stream));
    //     socket.current.on("");
    //   });

    //현재 nameSpace 접속자 인원 받아오기
    socket.current.on("currentNSLength", (data) => {
      console.log("This is total num", data);
      setNsHeadCount(data);
    });
    socket.current.emit("currentNSLength", "", (data) => {
      console.log("This is emit from client", data);
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
    socket.current.emit(
      "joinRoom",
      roomId,
      voiceChatUid,
      userInfo,
      "welcome!!!"
    );
  };

  const sendMessage = (roomId, chatId, userInfo, newMsg) => {
    socket.current.emit("roomMessage", roomId, chatId, userInfo, newMsg);
  };

  const createPeer = () => {};
  const addpeer = () => {};

  return { joinRoom, sendMessage, messages, nsHeadCount };
};

export default useSocket;
