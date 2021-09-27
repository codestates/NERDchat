import React from "react";
import { useParams } from "react-router-dom";
import useSocket from "../../../hooks/useSocket";
import { Cookies } from "react-cookie";

import "./Messenger.scss";

const Messenger = () => {
  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");
  const { gameId } = useParams();
  const { messages } = useSocket(gameId, "", userInfo, "", "");
  return (
    <div className="messagelist">
      <div className="messageonline">message</div>
    </div>
  );
};

export default Messenger;
