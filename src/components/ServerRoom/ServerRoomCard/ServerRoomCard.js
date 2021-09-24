import React, { useEffect } from "react";
import "./ServerRoomCard.scss";
import { BsFillMicFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ServerRoomCard = ({ gameId, id, roomTitle, uuid, max, loading, len }) => {
  return (
    <Link to={`/gameId=${gameId}/roomId=${uuid}/chatId=${id}`}>
      <div className="room__card__container">
        <div className="room__title" text-attr={roomTitle}>
          <span>{roomTitle}</span>
        </div>
        <div className="room__capacity">
          {len}/{max} <BsFillMicFill />
        </div>
      </div>
    </Link>
  );
};

export default ServerRoomCard;
