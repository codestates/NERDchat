import React, { useState, useEffect, useReducer } from 'react';

const Context = React.createContext({});

const userInfoDefault = {
  accessToken: '',
  id: '',
  avatar: '',
  userId: '',
  nickname: '',
  email: '',
  oauth: '',  //OAuth종류
  status: ''  //상태메시지
}

const userReducer = (state, action) => {
  if(action.type ==="GET"){
    return action.item;
  }
}

const ContextProvider = ({ children }) => {
  const [userInfo, dispatchUserInfo] = useReducer(userReducer, userInfoDefault)
  // loginmodal state
  const [isLogin, setIsLogin] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  // const [userInfo, setUserInfo] = useState({
  //   accessToken: '',
  //   id: '',
  //   avatar: '',
  //   userId: '',
  //   nickname: '',
  //   email: '',
  //   oauth: '',  //OAuth종류
  //   status: ''  //상태메시지
  // });
  const isLoginHandler = (b) => {
    //logout은 false값 받아오기
    setIsLogin(b);
  }
  const loginmodalHandler = () => {
    setLoginModalOpen((prev) => !prev);
  };
  const getUserInfo = (info) => {
    dispatchUserInfo({type:"GET", item:info})
    // console.log('after dispatch',userInfo)
    // setUserInfo(info)
  }
  console.log('outSide of the fc', userInfo, isLogin);
  useEffect(() => {
    if(userInfo.accessToken) setIsLogin(true)
  }, [userInfo])
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
