import { useState, useContext } from 'react';
import Modal from '../../UI/modal/Modal';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Context } from '../../context/ContextProvider';
import './RoomSetting.scss';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const RoomSetting = () => {
  const history = useHistory();
  const { createRoomModalHandler } = useContext(Context);
  const { gameId } = useParams();
  console.log(gameId);
  const [title, setTitle] = useState('');
  const [max, setMax] = useState(0);
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const handleMembers = (e) => {
    setMax(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ gameId, title, max });
    const path = 3;
    // res.data.uuid
    history.push(`/${gameId}/${path}`);
    const res = await axios.put(`${ENDPOINT}/rooms/create`, { gameId, title, max }, { withCredentials: true });
    console.log(res.data);
    // roomTitle,uuid,gameId,current,max,createdAt
    createRoomModalHandler();
    // chatroom안으로 리 다이렉트 시키기.
  };

  return (
    <>
      <Modal>
        <form className='room__setting__container' onSubmit={submitHandler}>
          {/* <div>Room</div> */}
          <div className='room__title__container'>
            <label htmlFor='roomName'>Room Name</label>
            <input id='roomName' type='text' onChange={titleHandler} placeholder='put room title' />
          </div>

          <div className='max__container'>
            <div><label htmlFor='members'>Max</label></div>
            <input value={max} step='1' id='members' type='range' min='0' max='6' placeholder='put room title' onChange={handleMembers} />
            <p>{max}</p>
          </div>
          <div className='create__container'>
            <button type='submit'>create</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default RoomSetting;
