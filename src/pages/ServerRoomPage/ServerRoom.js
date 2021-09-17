import { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './ServerRoom.scss';
import ServerRoomBody from '../../components/ServerRoom/ServerRoomBody/ServerRoomBody';
import ServerRoomHeader from '../../components/ServerRoom/ServerRoomHeader/ServerRoomHeader';
const ServerRoom = () => {
  return (

    <div className='server__room__container'>
      <div className='room__content'>
        <ServerRoomHeader />
        <ServerRoomBody />
      </div>
    </div>
  );
};

export default ServerRoom;
