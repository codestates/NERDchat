import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import Message from './Message/Message';
import './Chat.scss';
import { useParams } from 'react-router-dom';
import useSocket from '../../hooks/useSocket';
import { Context } from '../../context/ContextProvider';
import Peer from 'peerjs';
import { Cookies } from 'react-cookie';

function Chat () {
  const cookies = new Cookies();
  let userInfo = cookies.get('userInfo');
  const [newMsg, setNewMsg] = useState('');
  const myPeer = new Peer();
  const { gameId, roomId, chatId } = useParams();
  const ctx = useContext(Context);
  const { id, userId, avatar, nickname } = userInfo;
  userInfo = { id, userId, avatar, nickname };
  // console.log('This is from Chat', userInfo);
  const { joinRoom, messages, sendMessage } = useSocket(
    gameId,
    roomId,
    userInfo
  );
  useEffect(() => {
    joinRoom();
    // getMessage();
  }, []);
  const msgInputHandler = (e) => {
    setNewMsg(e.target.value);
  };
  const sendHandler = (e) => {
    e.preventDefault();
    console.log('clicked');
    sendMessage(roomId, chatId, userInfo, newMsg);
  };

  return (
    <div className='chat-container'>
      <Message />
      {messages.map(message => {
        return (<span className={message.mine ? 'mine' : 'others'}>{message.body}</span>);
      })}
      <form onSubmit={sendHandler}>
        <input type='text' onChange={msgInputHandler} value={newMsg} />
        <button type='submit'>send!</button>
      </form>
    </div>
  );
}

export default Chat;
