import './Modal.scss';
import logo from '../../components/login/glasses.svg';
import { IoMdClose } from 'react-icons/io';

const Modal = ({ children }) => {
  const closeButtonHandler = () => {};
  return (
    <div className='modal__background'>
      <div className='modal__wrapper'>
        <div className='modal__context'><img alt='glasses logo' className='logo' src={logo} />{children}</div>
        <div className='closeButton' onClick={closeButtonHandler}><IoMdClose className='closeIcon' color='white' size={20} /></div>
      </div>
    </div>
  );
};

export default Modal;
