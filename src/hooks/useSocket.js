import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const useSocket = (serverName, roomId, userInfo, audioList, audioRef) => {
  const socket = useRef();
  const myPeer = new Peer();
  const [messages, setMessages] = useState([]);
  const [nsHeadCount, setNsHeadCount] = useState(0);
  const [roomHeadCount, setRoomHeadCount] = useState(0);
  const [mic, setMic] = useState(true);
  const { nickname, userId } = userInfo;
  const [userList, setUserList] = useState([]);
  const users = [];
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

  const handleMuteMic = () => {
    setMic(!mic);

    let currentAudio = audioRef.current.getAudioTracks();
    currentAudio.forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  useEffect(() => {
    // if (!serverName) {
    //   console.log("there is no ns");
    //   socket.current = io(`${ENDPOINT}`, {
    //     autoConnect: false,
    //     transports: ["websocket"],
    //   });
    // } else {
    // console.log(444444, serverName);
    socket.current = io(`${ENDPOINT}/${serverName}`, {
      autoConnect: false,
      // transports: ["websocket"],
    });
    // }
    const token = localStorage.getItem("socketToken");
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
      console.log(77777, token);
      socket.current.auth = { token };
      localStorage.setItem("token", token);
      socket.current.userId = userId;
    });

    socket.current.on("users", (data) => {
      console.log(11414141414, data);
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
      // setUserList(users);
    });

    socket.current.on("user disconnected", (data) => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.userId === data) {
          user.connected = false;
          break;
        }
      }
      // setUserList(users);
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

    socket.current.on("private message", ({ content, from, to }) => {
      // for (let i = 0; i < users.length; i++) {
      //   const user = users[i];
      //   const fromSelf = socket.userId === from
      //   if (user.userId === (fromSelf ? to : from)) {
      //     user.messages.push({
      //       content, fromSelf
      //     });
      //     if (user !== selectedUser) {
      //       user.hasNewMessages = true;
      //     }
      //     break;
      //   }
      // }
      // selectedUser -> onlien, friend list에서 내가 선택하는 유저의 아이디
    });

    socket.current.on("disconenct", () => {
      users.forEach((el) => {
        if (el.userId === userId) {
          el.connected = false;
        }
      });
    });

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
    return () => {
      socket.current.off("connect");
      socket.current.off("token");
      socket.current.off("users");
      socket.current.off("user connected");
      socket.current.off("user disconnected");
      socket.current.off("private message");
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

  const privateMessage = (msgData, userId) => {
    socket.current.emit("private message", { content: msgData, to: userId });
  };

  const sendMessage = (roomId, chatId, userInfo, newMsg) => {
    socket.current.emit("roomMessage", roomId, chatId, userInfo, newMsg);
  };

  // console.log("This is useSocket users", userList);
  return {
    joinRoom,
    sendMessage,
    messages,
    nsHeadCount,
    users,
    handleMuteMic,
    userList,
    privateMessage,
  };
};

export default useSocket;
