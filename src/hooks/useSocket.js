import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

// serverRoom.js, Chat.js에서 사용중
const useSocket = (serverName, roomId, userInfo) => {
  console.log(`This is ServerName, ${serverName}, ${roomId}, ${userInfo}`);
  console.log(userInfo);
  const [messages, setMessages] = useState([]);
  const socket = useRef();

  useEffect(() => {
    // serverName = nameSpace, roomId = roomId
    // serverName이라는 ns로 접속하고, socket.current에 배당.
    socket.current = io(`http://localhost:8080/${serverName}`, {
      query: { serverName, roomId }
    });
    socket.current.on('welcomeRoom', (userData, msgData) => console.log(userData, msgData));
    // 서버쪽에서 객체형태로 메시지를 넘겨줄때는 아래처럼 하나의 인자로 받을 수 있지만,
    // 만약 객체로 묶지 않고 여러개의 인자로 넘겨줄때는 위처럼 2개의 인자로 나누어 받아야 한다.
    socket.current.on('roomMessage', (data) => {
      // console.log(data);
      const incomingMsg = { body: data.msgData, mine: data.userData.userId === userInfo.userId };
      console.log(incomingMsg);
      setMessages((prev) => [...prev, incomingMsg]);
    });
    return () => {
      socket.current.close();
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = (roomId, chatId, userInfo, newMsg) => {
    // console.log(roomId, chatId, userInfo, newMsg);
    socket.current.emit('roomMessage', roomId, chatId, userInfo, newMsg);
  };

  const joinRoom = () => {
    console.log();
    socket.current.emit('joinRoom', roomId, 123, userInfo, 'welcome!!!');
    console.log('joinRoom activated');
  };
  return { joinRoom, messages, sendMessage };
};

export default useSocket;
