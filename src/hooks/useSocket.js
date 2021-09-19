import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (serverName, roomId, userInfo) => {
  console.log(`This is ServerName, ${serverName}, ${roomId}, ${userInfo}`);
  const [message, setMessage] = useState('');
  const socket = useRef();

  const sendMessage = (roomId, chatId, userInfo, newMsg) => {
    console.log(roomId, chatId, userInfo, newMsg);
    socket.current.emit('roomMessage', roomId, chatId, userInfo, newMsg);
  };
  const getMessage = () => {
    // console.log('getmessage')
    // socket.current.on('roomMessage', (data) => console.log(data))
  };
  const joinRoom = () => {
    console.log();
    socket.current.emit('joinRoom', roomId, 123, userInfo, 'welcome!!!');
    console.log('joinRoom activated');
  };
  useEffect(() => {
    // serverName = nameSpace, roomId = roomId
    // serverName이라는 ns로 접속하고, socket.current에 배당.
    socket.current = io(`http://localhost:8080/${serverName}`, { query: { serverName, roomId } });
    socket.current.on('roomMessage', (data) => {
      console.log(123);
      console.log(data);
    });
    return () => {
      socket.current.close();
      socket.current.disconnect();
    };
  }, []);

  return { joinRoom, message, sendMessage, getMessage };
};

export default useSocket;
