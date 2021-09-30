import { useState, useContext } from "react";
import Modal from "../../UI/modal/Modal";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import Loader from "../Loader/Loader";
import "./RoomSetting.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const RoomSetting = () => {
  const history = useHistory();
  const { createRoomModalHandler } = useContext(Context);
  const { gameId } = useParams();
  const [serverId, setServerId] = useState(gameId);
  const [headCount, setHeadCount] = useState(0);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState("false");

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const handleMembers = (e) => {
    setHeadCount(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (title.trim().length <= 2) {
      setErr("Room Title should be longer than 2 letters");
      console.log(222212, title, err);
    } else if (headCount < 2) {
      setErr("Room Title should be longer than 2 letters");
    }
    // console.log(serverId, title, headCount);

    const chatId = 1;
    if (title.trim().length > 2 && headCount >= 2) {
      const res = await axios.put(
        `${ENDPOINT}/rooms/create`,
        { gameId: serverId, title, max: headCount },
        { withCredentials: true }
      );
      const { roomTitle, uuid, gameId, current, max, createdAt } =
        res.data.data;
      console.log("This is created", res.data.data);
      setLoading(false);
      createRoomModalHandler();
      // chatroom안으로 리 다이렉트 시키기.
      // chatId 달라고 하기.
      history.push(`/gameId=${gameId}/roomId=${uuid}/chatId=${chatId}`);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal>
        <form className="room__setting__container" onSubmit={submitHandler}>
          {/* <div>Room</div> */}
          <div className="room__title__container">
            <label htmlFor="roomName">Room Name</label>
            <input
              id="roomName"
              type="text"
              onChange={titleHandler}
              placeholder="put room title"
            />
          </div>

          <div className="max__container">
            <div>
              <label htmlFor="members">Max HeadCount</label>
            </div>
            <div className="headcount__input__container">
              <input
                value={headCount}
                step="1"
                id="members"
                type="range"
                min="0"
                max="6"
                placeholder="put room title"
                onChange={handleMembers}
              />
              <p>{headCount} 명</p>
            </div>
          </div>
          <div className="create__container">
            <button type="submit">Create!</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default RoomSetting;
