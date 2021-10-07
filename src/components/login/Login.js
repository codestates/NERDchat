import React, { useState, useContext } from "react";
import "./Login.scss";
import Modal from "../../UI/modal/Modal";
import LoginTab from "./LoginTab";
import LoginBody from "./LoginBody";
import SignUp from "./SignUp";
import { Context } from "../../context/ContextProvider";

const Login = () => {
  const { loginModalOpen } = useContext(Context);
  // tab state
  const [isLoginClicked, setisLoginClicked] = useState(true);
  const loginTablHandler = (num) => {
    if (num) setisLoginClicked(true);
    else setisLoginClicked(false);
  };
  return (
    <>
      {loginModalOpen && (
        <Modal>
          <LoginTab
            isLoginClicked={isLoginClicked}
            loginTablHandler={loginTablHandler}
          />
          {isLoginClicked && <LoginBody />}
          {!isLoginClicked && <SignUp />}
        </Modal>
      )}
    </>
  );
};

export default Login;
