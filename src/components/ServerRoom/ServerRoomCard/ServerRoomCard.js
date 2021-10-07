import React, { useContext } from "react";
import "./ServerRoomCard.scss";
import { IoMicOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { Context } from "../../../context/ContextProvider";

const ServerRoomCard = ({ gameId, id, roomTitle, uuid, max, loading, len }) => {
  const { loginmodalHandler } = useContext(Context);
  const history = useHistory();
  const getIntoServer = () => {
    if (!localStorage.getItem("nerd-logged-in")) {
      loginmodalHandler();
      return;
    }
    const path = `/gameId=${gameId}/roomId=${uuid}/chatId=${id}`;
    history.push({
      pathname: path,
      state: { roomTitle },
    });
  };
  return (
    <div onClick={getIntoServer} className="room__card">
      <div className="room__card__container">
        <div className="room__title" text-attr={roomTitle}>
          <span>{roomTitle}</span>
        </div>
        <div className="room__capacity">
          {len}/{max} <IoMicOutline size={20} />
        </div>
      </div>
    </div>
  );
};

export default ServerRoomCard;
