import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocketMember = (uuid) => {
  const [message, setMessage] = useState('');
  const socket = useRef();
  const sendMessage = (data) => {
    socket.emit('msg', data);
  };

  useEffect(() => {
    socket.current = io(`http://localhost:8080/${uuid}`);

    return () => {
      socket.current.close();
      socket.current.disconnect();
    };
  }, []);

  return { sendMessage };
};

export default useSocketMember;
