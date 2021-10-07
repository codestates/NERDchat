import { useContext } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Context } from "../../../context/ContextProvider";
import "./ServerRoomHeader.scss";
import RoomSetting from "../../RoomSetting/RoomSetting";

const ServerRoomHeader = ({ headCount }) => {
  const { createRoomOpen, createRoomModalHandler } = useContext(Context);

  const creatRoomHandler = () => {
    createRoomModalHandler();
  };

  return (
    <>
      {createRoomOpen && <RoomSetting />}
      <div className="server__room__header__container">
        <Link to="/servers" className="back__icons">
          <IoChevronBackOutline size={25} />
          <h2 className="nerdtitle" data-text="NERDchat">
            HOME
          </h2>
        </Link>
        <div className="headCount__container">
          {`Concurrent Users: ${headCount}`}
        </div>
        <button className="create__room" onClick={creatRoomHandler}>
          Create Room
        </button>
      </div>
    </>
  );
};

export default ServerRoomHeader;
