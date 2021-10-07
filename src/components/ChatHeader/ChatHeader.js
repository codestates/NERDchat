import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./ChatHeader.scss";

function ChatHeader({ roomTitle, currentUser }) {
  const { gameId } = useParams();

  useEffect(() => {});

  return (
    <div className="chatheader__container">
      <div className="chatheader__container-start">
        <div className="chatheader__icon">
          <Link to={`/gameId=${gameId}`}>
            <IoChevronBackOutline size={25} className="iconback" />
          </Link>
        </div>
        <div className="chatheader__title">{roomTitle}</div>
      </div>
      <div className="chatheader__nember">
        <span> Concurrent Users: {currentUser}</span>
      </div>
    </div>
  );
}

export default ChatHeader;
