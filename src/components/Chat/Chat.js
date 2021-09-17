import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Message from './Message/Message';

import './Chat.scss';

let socket;

function Chat () {
  return (
    <div className='chat-container'>
      <Message />
    </div>
  );
}

export default Chat;
