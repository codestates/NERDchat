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
  oauth: "",
  status: "",
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
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteFriendModalOpen, setDeleteFriendModalOpen] = useState(false);
  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [privateModalOpen, setPrivateModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const isLoginHandler = () => {
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
  const inviteModalHandler = () => {
    setInviteModalOpen((prev) => !prev);
  };
  const getUserInfo = (info) => {
    let cookieUserInfo = info;
    const { id, avatar, userId, nickname, email, oauth, status } =
      cookieUserInfo;
    cookieUserInfo = { id, avatar, userId, nickname, email, oauth, status };
    cookies.set("userInfo", cookieUserInfo, {
      domain: ".nerdchat.link",
      sameSite: "none",
      secure: true,
    });
    dispatchUserInfo({ type: "GET", item: info });
  };

  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const createRoomModalHandler = () => {
    setCreateRoomOpen((prev) => !prev);
  };

  // bookmark
  // friend lists
  const getFriendsListHandler = async () => {
    const res = await axios.get(`${ENDPOINT}/friends/lists`, {
      withCredentials: true,
    });
    setFriends(res.data.data);
  };
  useEffect(() => {
    if (localStorage.getItem("nerd-logged-in")) {
      getFriendsListHandler();
    }
  }, [userInfo]);
  return (
    <Context.Provider
      value={{
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
        inviteModalOpen,
        inviteModalHandler,
        friends,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
