import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

import Peer from "peerjs";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const useSocket = (serverName, roomId, userInfo, audioList, audioRef) => {
  const [messages, setMessages] = useState([]);
  const [peers, setPeers] = useState([]);
  const [nsHeadCount, setNsHeadCount] = useState(0);
  const [roomHeadCount, setRoomHeadCount] = useState(0);
  const [mic, setMic] = useState(true);
  const [userList, setUserList] = useState([]);

  const socket = useRef();
  const myPeer = new Peer();

  const { nickname, userId } = userInfo;
  const users = [];
  let voiceChatUid = "";
  if (roomId) {
    voiceChatUid = roomId + "-vUid" + Math.floor(Math.random() * 100);
  }

  // const addAudioStream = (audio, stream) => {
  //   audio.srcObject = stream;
  //   audio.addEventListener("loadedmetadata", () => {
  //     audio.play();
  //   });
  //   audioList.current.append(audio);
  // };

  const handleMuteMic = () => {
    setMic(!mic);

    let currentAudio = audioRef.current.getAudioTracks();
    currentAudio.forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

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

      socket.current.on("welcomeRoom", (userData, msgData) =>
        console.log(userData, msgData)
      );
      socket.current.on("roomMessage", (userData, msgData) => {
        const incomingMsg = {
          body: msgData,
          user: userData.userId,
          mine: userData.userId === userInfo.userId,
        };
        setMessages((prevM) => [...prevM, incomingMsg]);
      });

      socket.current.on("disconenct", () => {
        users.forEach((el) => {
          if (el.userId === userId) {
            el.connected = false;
          }
        });
      });

      if (voiceChatUid.length !== 0) {
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            console.log(stream.id);
            myPeer.on("open", (peerId) => {
              console.log("My peer is on!");
              socket.current.emit("voiceChat", voiceChatUid, userInfo, peerId);
            });
          });
      }
      // //Voice
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
    }
    return () => {
      socket.current.off("connect");
      socket.current.off("token");
      socket.current.off("users");
      socket.current.off("user connected");
      socket.current.off("user disconnected");
      socket.current.off("disconenct");
      socket.current.off("welcomeRoom");
      socket.current.off("roomMessage");
      socket.current.off("currentNSLength");
      socket.current.off("currentRoomLength");
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

  return {
    joinRoom,
    sendMessage,
    messages,
    nsHeadCount,
    handleMuteMic,
    userList,
  };
};

export default useSocket;
