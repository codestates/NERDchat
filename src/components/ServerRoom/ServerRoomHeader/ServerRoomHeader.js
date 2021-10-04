import { useContext, useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Context } from "../../../context/ContextProvider";
import "./ServerRoomHeader.scss";
import RoomSetting from "../../RoomSetting/RoomSetting";
import useSocket from "../../../hooks/useSocket";
import socket from "../../../hooks/socket";

const ServerRoomHeader = ({ gameId, headCount }) => {
  const [userNum, setUserNum] = useState(0);
  const { createRoomOpen, createRoomModalHandler } = useContext(Context);
  // const userNum = userList.filter((user) => user.connected === true).length;

  const creatRoomHandler = () => {
    createRoomModalHandler();
  };

  // useEffect(() => {
  //   const num = getUserHead();
  // }, []);
  return (
    <>
      {createRoomOpen && <RoomSetting />}
      <div className="server__room__header__container">
        <Link to="/servers" className="back__icons">
          <IoIosArrowBack size={20} />
          <h2 className="nerdtitle" data-text="NERDchat">
            NERDchat
          </h2>
        </Link>
        <div className="headCount__container">
          {`Concurrent Users: ${headCount}`}
        </div>
        {/* <ServerSearch /> */}
        <button className="create__room" onClick={creatRoomHandler}>
          Create Room
        </button>
      </div>
    </>
  );
};

export default ServerRoomHeader;
