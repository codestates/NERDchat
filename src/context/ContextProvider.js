import React, { useState, useEffect } from 'react';

const Context = React.createContext({});

const ContextProvider = ({ children }) => {
  // loginmodal state
  const [isLogin, setIsLogin] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const loginmodalHandler = () => {
    setLoginModalOpen((prev) => !prev);
    console.log(loginModalOpen);
  };
  const [userInfo, setUserInfo] = useState({});

  // bookmark
  // friend lists
  // server game lists
  // login userInfo
  // online user ->실시간 어떻게 구현하지...?
  return (
    <Context.Provider
      value={{
			  isLogin,
			  loginModalOpen,
			  loginmodalHandler
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
