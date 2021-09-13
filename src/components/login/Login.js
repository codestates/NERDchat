import React, { useState } from 'react';
import './Login.scss';
import Modal from '../../UI/modal/Modal';
import LoginTab from './LoginTab';
import LoginBody from './LoginBody';
import SignUp from './SignUp';

const Login = () => {
  const [isLoginClicked, setisLoginClicked] = useState(true);
  const loginTablHandler = (num) => {
    if (num)setisLoginClicked(true);
    else setisLoginClicked(false);
  };
  return (
    <Modal>

      <LoginTab isLoginClicked={isLoginClicked} loginTablHandler={loginTablHandler} />
      {isLoginClicked && <LoginBody />}
      {!isLoginClicked && <SignUp />}
    </Modal>
  );
};

export default Login;
