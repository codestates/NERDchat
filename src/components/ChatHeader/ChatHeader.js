import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { IoChevronBackOutline, IoMicOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./ChatHeader.scss";
import useLists from "../../hooks/useLists";

function ChatHeader({ path }) {
  const { gameId } = useParams();

  const [currentNum] = useState(2);

  const [pageNum] = useState(1);

  const { lists } = useLists(pageNum, "post", "/rooms/list/", { gameId });

  return (
    <div className="chatheader__container">
      <div className="chatheader__icon">
        <Link to="/servers">
          <IoChevronBackOutline size={25} className="iconback" />
        </Link>
      </div>
      <div className="chatheader__title">
        {lists.map((el, i) => (
          <span key={i}>{el.uuid === path.roomId ? el.roomTitle : null}</span>
        ))}
      </div>
      <div className="chatheader__mic">
        <IoMicOutline size={25} />
      </div>
      <div className="chatheader__nember">
        <span> Now {currentNum} nerd gamers are connected </span>
      </div>
    </div>
  );
}

export default ChatHeader;
