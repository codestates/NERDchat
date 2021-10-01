import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

const Context = React.createContext({});

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const userInfoDefault = {
  accessToken: "",
  id: "",
  avatar: "",
  userId: "",
  nickname: "",
  email: "",
  oauth: "", // OAuth종류
  status: "", // 상태메시지
};

const userReducer = (state, action) => {
  if (action.type === "GET") {
    return action.item;
  }
};

const ContextProvider = ({ children }) => {
  const cookies = new Cookies();
  const [friends, setFriends] = useState([]);
  const [userInfo, dispatchUserInfo] = useReducer(userReducer, userInfoDefault);
  // loginmodal state
  const [isLogin, setIsLogin] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteFriendModalOpen, setDeleteFriendModalOpen] = useState(false);
  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [privateModalOpen, setPrivateModalOpen] = useState(false);

  const isLoginHandler = () => {
    // logout은 false값 받아오기
    localStorage.setItem("nerd-logged-in", true);
  };
  const loginmodalHandler = () => {
    setLoginModalOpen((prev) => !prev);
  };
  const logoutModalHandler = () => {
    setLogoutModalOpen((prev) => !prev);
  };
  const deleteFriendModalHandler = () => {
    setDeleteFriendModalOpen((prev) => !prev);
  };
  const addFriendModalHandler = () => {
    setAddFriendModalOpen((prev) => !prev);
  };
  const userInfoModalHandler = () => {
    setUserInfoModalOpen((prev) => !prev);
  };

  const privateModalHandler = () => {
    setPrivateModalOpen((prev) => !prev);
  };
  const getUserInfo = (info) => {
    let cookieUserInfo = info;
    const { id, avatar, userId, nickname, email, oauth, status } =
      cookieUserInfo;
    cookieUserInfo = { id, avatar, userId, nickname, email, oauth, status };
    cookies.set("userInfo", cookieUserInfo);
    dispatchUserInfo({ type: "GET", item: info });
    // console.log('after dispatch',userInfo)
    // setUserInfo(info)
  };

  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const createRoomModalHandler = () => {
    setCreateRoomOpen((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/friends/lists`, { withCredentials: true })
      .then((res) => setFriends(res.data.data));
  }, []);
  // bookmark
  // friend lists
  // server game lists
  // login userInfo
  // online user ->실시간 어떻게 구현하지...?
  return (
    <Context.Provider
      value={{
        // isLogin,
        loginModalOpen,
        loginmodalHandler,
        getUserInfo,
        isLoginHandler,
        createRoomOpen,
        createRoomModalHandler,
        userInfo,
        logoutModalOpen,
        logoutModalHandler,
        deleteFriendModalOpen,
        addFriendModalOpen,
        deleteFriendModalHandler,
        addFriendModalHandler,
        userInfoModalHandler,
        userInfoModalOpen,
        privateModalHandler,
        privateModalOpen,
        friends,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
