import React, { useState } from "react";
import { IoChevronBackOutline, IoMicOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./ChatHeader.scss";

function ChatHeader() {
  const [gameTitle, setGameTitle] = useState("듀오 서ㅏ폿 구함");
  const [currentNum, setCurrentNum] = useState(2);

  return (
    <div className="chatheader__container">
      <div className="chatheader__icon">
        <Link to="/servers">
          <IoChevronBackOutline size={30} className="iconback" />
        </Link>
      </div>
      <div className="chatheader__title">
        <span>{gameTitle}</span>
      </div>
      <div className="chatheader__mic">
        <IoMicOutline size={30} />
      </div>
      <div className="chatheader__nember">
        <span> Now {currentNum} nerd gamers are connected </span>
      </div>
    </div>
  );
}

export default ChatHeader;
