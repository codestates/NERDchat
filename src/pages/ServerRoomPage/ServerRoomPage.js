import './ServerRoomPage.scss';
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
