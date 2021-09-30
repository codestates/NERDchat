import React, { useContext, useRef } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import { IoMdClose } from "react-icons/io";
import { Context } from "../../context/ContextProvider";

const Modal = ({ children }) => {
  const modalRef = useRef();
  const {
    loginModalOpen,
    loginmodalHandler,
    createRoomOpen,
    createRoomModalHandler,
    logoutModalOpen,
    logoutModalHandler,
    deleteFriendModalOpen,
    addFriendModalOpen,
    deleteFriendModalHandler,
    addFriendModalHandler,
    userInfoModalOpen,
    userInfoModalHandler,
  } = useContext(Context);
  const backgroundCloseHandler = (e) => {
    if (modalRef.current === e.target) {
      if (loginModalOpen) loginmodalHandler();
      else if (createRoomOpen) createRoomModalHandler();
      else if (logoutModalOpen) logoutModalHandler();
      else if (deleteFriendModalOpen) deleteFriendModalHandler();
      else if (addFriendModalOpen) addFriendModalHandler();
      else if (userInfoModalOpen) userInfoModalHandler();
    }
  };
  const closeButtonHandler = (event) => {
    if (loginModalOpen) loginmodalHandler();
    else if (createRoomOpen) createRoomModalHandler();
    else if (logoutModalOpen) logoutModalHandler();
    else if (deleteFriendModalOpen) deleteFriendModalHandler();
    else if (addFriendModalOpen) addFriendModalHandler();
    else if (userInfoModalOpen) userInfoModalHandler();
  };

  const portalPlace = document.getElementById("overlay");
  return (
    <>
      {ReactDOM.createPortal(
        <div
          className="modal__background"
          ref={modalRef}
          onClick={backgroundCloseHandler}
        >
          <div className="modal__wrapper">
            <div className="modal__context">{children}</div>
            <div className="closeButton" onClick={closeButtonHandler}>
              <IoMdClose className="closeIcon" size={20} />
            </div>
          </div>
        </div>,
        portalPlace
      )}
    </>
  );
};

export default Modal;
