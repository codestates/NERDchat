import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const useSocket = (serverName, roomId, userInfo, audioList, audioRef) => {
  const socket = useRef();
  const myPeer = new Peer();
  // const audioList = useRef();
  // const audioRef = useRef();
  const [messages, setMessages] = useState([]);
  const [nsHeadCount, setNsHeadCount] = useState(0);
  const [roomHeadCount, setRoomHeadCount] = useState(0);
  // console.log("This is userInfo", userInfo);
  let voiceChatUid = "";
  if (roomId) {
    voiceChatUid = roomId + "-vUid" + Math.floor(Math.random() * 100);
    // console.log("This is voiceChatUid, ", voiceChatUid);
  }
  // const addAudioStream = (audio, stream) => {
  //   audio.srcObject = stream;
  //   audio.addEventListener("loadedmetadata", () => {
  //     audio.play();
  //   });
  //   audioList.current.append(audio);
  // };
  useEffect(() => {
    socket.current = io(`${ENDPOINT}/${serverName}`);
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

    //Voice
    // if (voiceChatUid.length !== 0) {
    //   navigator.mediaDevices
    //     .getUserMedia({ video: false, audio: true })
    //     .then((stream) => {
    //       myPeer.on("open", (peerId) => {
    //         socket.current.emit("voiceChat", voiceChatUid, userInfo, peerId);
    //       });
    //       addAudioStream(audioRef.current, stream);
    //       myPeer.on("call", (call) => {
    //         call.answer(stream);
    //         const audio = document.createElement("audio");
    //         audio.setAttribute("autoPlay", "playsInline");
    //         call.on("stream", (userAudio) => {
    //           addAudioStream(audio, userAudio);
    //         });
    //       });
    //       socket.current.on("userConnect", (peerId) => {
    //         const peerCall = myPeer.call(peerId, stream);
    //         const audio = document.createElement("audio");
    //         peerCall.on("stream", (userAudio) => {
    //           addAudioStream(audio, userAudio);
    //         });
    //         peerCall.on("close", () => {
    //           audio.remove();
    //         });
    //       });
    //     });
    // }

    //현재 nameSpace 접속자 인원 받아오기
    socket.current.on("currentNSLength", (data) => {
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
      socket.current.close();
      socket.current.disconnect();
    };
  }, [serverName, roomId]);

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

  return { joinRoom, sendMessage, messages, nsHeadCount };
};

export default useSocket;
