import { useContext } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/ContextProvider';
import './ServerRoomHeader.scss';
import ServerSearch from '../ServerSerch/ServerSearch';
import RoomSetting from '../../RoomSetting/RoomSetting';

const ServerRoomHeader = () => {
  const { createRoomOpen, createRoomModalHandler } = useContext(Context);

  const creatRoomHandler = () => {
    createRoomModalHandler();
  };
  return (
    <>
      {createRoomOpen && <RoomSetting />}
      <div className='server__room__header__container'>
        <Link to='/servers' className='back__icons'>
          <IoIosArrowBack size={30} />
          <IoIosArrowBack size={30} />
          <h2 data-text='NERDchat'>NERDchat</h2>
        </Link>
        {/* <ServerSearch/> */}
        <button className='create__room' onClick={creatRoomHandler}>Create!</button>
      </div>
    </>
  );
};

export default ServerRoomHeader;
