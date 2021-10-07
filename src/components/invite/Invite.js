import { useContext } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../UI/modal/Modal";
import socket from "../../hooks/socket";
import { Context } from "../../context/ContextProvider";
import "./Invite.scss";

const Invite = ({ nickname }) => {
  const { inviteModalHandler } = useContext(Context);
  const { gameId, roomId } = useParams();
  const address = window.location.href;

  const yesHandler = () => {
    inviteModalHandler();
    // const inviteMessage = `${address}로 이동 하시겠습니까?`;
    if (gameId && roomId) {
      socket.emit("private message", {
        content: address,
        to: nickname,
        invite: 1,
      });
    }
  };
  const noHandler = () => {
    inviteModalHandler();
  };
  return (
    <Modal>
      {gameId && roomId ? (
        <div className="invite__container">
          <div className="invite__content">Invite {nickname}?</div>

          <div className="invite__btn__container">
            <button onClick={yesHandler}>YES</button>
            <button onClick={noHandler}>NO</button>
          </div>
        </div>
      ) : (
        <div className="invite__container">
          <div className="invite__content">
            User has not entered the room yet!
          </div>

          <div className="invite__btn__container">
            <button onClick={yesHandler}>OK</button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Invite;
