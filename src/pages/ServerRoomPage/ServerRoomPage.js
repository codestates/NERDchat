import { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './ServerRoomPage.scss';
import ServerRoomBody from '../../components/ServerRoom/ServerRoomBody/ServerRoomBody';
import ServerRoomHeader from '../../components/ServerRoom/ServerRoomHeader/ServerRoomHeader';
import ServerRoom from '../../components/ServerRoom/ServerRoom';
const ServerRoomPage = () => {
  return (

    <div className='server__room__container'>
      <div className='room__content'>
        <ServerRoom />
      </div>
    </div>
  );
};

export default ServerRoomPage;
