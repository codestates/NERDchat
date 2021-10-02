import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "../../UI/modal/Modal";
import socket from "../../hooks/socket";
import { Context } from "../../context/ContextProvider";
import "./Invite.scss";

const Invite = ({ nickname, userInfo }) => {
  const { inviteModalHandler, privateModalHandler } = useContext(Context);
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

      // privateModalHandler();
    }
  };
  const noHandler = () => {
    inviteModalHandler();
  };
  return (
    <Modal>
      {gameId && roomId ? (
        <div className="invite__container">
          <div className="invite__content">
            {nickname}님을 초대 하시겠습니까?
          </div>

          <div className="invite__btn__container">
            <button onClick={yesHandler}>YES</button>
            <button onClick={noHandler}>NO</button>
          </div>
        </div>
      ) : (
        <div className="invite__container">
          <div className="invite__content">현재 방에 입장하지 않았습니다.</div>

          <div className="invite__btn__container">
            <button onClick={yesHandler}>Okay</button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Invite;
