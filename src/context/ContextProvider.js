import React, { useState, useEffect, useReducer } from 'react';
import { Cookies } from 'react-cookie';

const Context = React.createContext({});

const userInfoDefault = {
  accessToken: '',
  id: '',
  avatar: '',
  userId: '',
  nickname: '',
  email: '',
  oauth: '', // OAuth종류
  status: '' // 상태메시지
};

const userReducer = (state, action) => {
  if (action.type === 'GET') {
    return action.item;
  }
};

const ContextProvider = ({ children }) => {
  const cookies = new Cookies();
  const [userInfo, dispatchUserInfo] = useReducer(userReducer, userInfoDefault);
  // loginmodal state
  const [isLogin, setIsLogin] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const isLoginHandler = (b) => {
    // logout은 false값 받아오기
    setIsLogin(b);
  };
  const loginmodalHandler = () => {
    setLoginModalOpen((prev) => !prev);
  };
  const getUserInfo = (info) => {
    let cookieUserInfo = info;
    const { id, avatar, userId, nickname, email, oauth, status } = cookieUserInfo;
    cookieUserInfo = { id, avatar, userId, nickname, email, oauth, status };
    cookies.set('userInfo', cookieUserInfo);
    dispatchUserInfo({ type: 'GET', item: info });
    // console.log('after dispatch',userInfo)
    // setUserInfo(info)
  };

  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const createRoomModalHandler = () => {
    setCreateRoomOpen((prev) => !prev);
  };

  useEffect(() => {
    if (userInfo.accessToken) setIsLogin(true);
  }, [userInfo]);
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
        loginmodalHandler,
        getUserInfo,
        isLoginHandler,
        createRoomOpen,
        createRoomModalHandler,
        userInfo
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
