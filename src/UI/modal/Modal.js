import React, { useContext, useRef } from 'react';
import './Modal.scss';
import logo from '../../components/login/glasses.svg';
import { IoMdClose } from 'react-icons/io';
import { Context } from '../../context/ContextProvider';

const Modal = ({ children }) => {
  const modalRef = useRef();
  const { loginModalOpen, loginmodalHandler, createRoomOpen, createRoomModalHandler } = useContext(Context);
  const backgroundCloseHandler = (e) => {
    if (modalRef.current === e.target) {
      if (loginModalOpen) loginmodalHandler();
      else if (createRoomOpen) createRoomModalHandler();
    }
  };
  const closeButtonHandler = (event) => {
    if (loginModalOpen) loginmodalHandler();
    else if (createRoomOpen) createRoomModalHandler();
  };
  return (
    <div className='modal__background' ref={modalRef} onClick={backgroundCloseHandler}>
      <div className='modal__wrapper'>
        <div className='modal__context'><img alt='glasses logo' className='logo' src={logo} />{children}</div>
        <div className='closeButton' onClick={closeButtonHandler}><IoMdClose className='closeIcon' color='white' size={20} /></div>
      </div>
    </div>
  );
};

export default Modal;
