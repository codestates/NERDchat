import { useContext } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../../../hooks/useSocket";
import { Cookies } from "react-cookie";
import { Context } from "../../../context/ContextProvider";
import PrivateMessageModal from "../../PrivateMessageModal/PrivateMessageModal";

import "./Messenger.scss";

const Messenger = ({
  avatar,
  nickname,
  messages,
  online,
  privateHandler,
  msg,
}) => {
  const { privateModalHandler, privateModalOpen } = useContext(Context);
  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");
  const { gameId } = useParams();

  const privateModalOpenHandler = () => {
    privateModalHandler();
  };

  return (
    <>
      {privateModalOpen && (
        <PrivateMessageModal
          nickname={nickname}
          messages={messages}
          privateHandler={privateHandler}
          msg={msg}
        />
      )}
      <div className="messagelist" onClick={privateModalOpenHandler}>
        <div className="userInfo__container">
          <div className="m__avatar__container">
            <img
              className="m__avatar"
              src={
                avatar !== ""
                  ? avatar
                  : require("../../../images/dummy/white.jpeg").default
              }
              alt="m_avatar"
            />
          </div>
        </div>
        <div className="latest__message__container">
          <div className="m__name">
            <p>{nickname}</p>
          </div>
          <div className="latest__message__content">
            {msg.length > 0
              ? msg[msg.length - 1].content
              : messages[messages.length - 1].content}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
