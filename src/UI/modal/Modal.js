import React, { useContext, useRef } from "react";
import "./Modal.scss";
import { ReactComponent as Glasses } from "../../images/glasses.svg";
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
  } = useContext(Context);
  const backgroundCloseHandler = (e) => {
    if (modalRef.current === e.target) {
      if (loginModalOpen) loginmodalHandler();
      else if (createRoomOpen) createRoomModalHandler();
      else if (logoutModalOpen) logoutModalHandler();
      else if (deleteFriendModalOpen) deleteFriendModalHandler();
      else if (addFriendModalOpen) addFriendModalHandler();
    }
  };
  const closeButtonHandler = (event) => {
    if (loginModalOpen) loginmodalHandler();
    else if (createRoomOpen) createRoomModalHandler();
    else if (logoutModalOpen) logoutModalHandler();
    else if (deleteFriendModalOpen) deleteFriendModalHandler();
    else if (addFriendModalOpen) addFriendModalHandler();
  };
  return (
    <div
      className="modal__background"
      ref={modalRef}
      onClick={backgroundCloseHandler}
    >
      <div className="modal__wrapper">
        <div className="modal__context">
          {/* <Glasses className="modal__logo" /> */}
          {children}
        </div>
        <div className="closeButton" onClick={closeButtonHandler}>
          <IoMdClose className="closeIcon" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
