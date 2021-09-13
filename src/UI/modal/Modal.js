import './Modal.scss';
import logo from '../../components/login/glasses.svg';
import { IoMdClose } from 'react-icons/io';

const Background = ({ children }) => {
  return (<div className='background'>{children}</div>);
};

const Modal = ({ children }) => {
  return (
    <Background>
      <div className='modal__wrapper'>
        <div className='modal__context'><img className='logo' src={logo} />{children}</div>
        <div className='closeButton'><IoMdClose className='closeIcon' color='white' size={20} /></div>
      </div>
    </Background>
  );
};

export default Modal;
