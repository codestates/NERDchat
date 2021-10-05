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
      <div className="chatheader__container-start">
        <div className="chatheader__icon">
          <Link to="/servers">
            <IoChevronBackOutline size={25} className="iconback" />
          </Link>
        </div>
        <div className="chatheader__title">
          {lists.map((el, i) => (
            <div key={i}>{el.uuid === path.roomId ? el.roomTitle : null}</div>
          ))}
        </div>
      </div>
      <div className="chatheader__nember">
        <span> Concurrent Users: {currentNum} </span>
      </div>
    </div>
  );
}

export default ChatHeader;
