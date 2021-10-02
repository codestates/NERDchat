import React, { useContext } from "react";
import "./ServerRoomCard.scss";
import { BsFillMicFill } from "react-icons/bs";
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
    history.push(path);
  };
  return (
    <div onClick={getIntoServer}>
      <div className="room__card__container">
        <div className="room__title" text-attr={roomTitle}>
          <span>{roomTitle}</span>
        </div>
        <div className="room__capacity">
          {len}/{max} <BsFillMicFill />
        </div>
      </div>
    </div>
  );
};

export default ServerRoomCard;
