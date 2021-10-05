import "./ServerRoomPage.scss";
import { useState, useEffect } from "react";

import useSocket from "../../hooks/useSocket";
import { useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

import axios from "axios";

import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../UI/SideBar/SideBar";
import ServerRoomHeader from "../../components/ServerRoom/ServerRoomHeader/ServerRoomHeader";
import ServerSearch from "../../components/ServerRoom/ServerSerch/ServerSearch";
import ServerRoomBody from "../../components/ServerRoom/ServerRoomBody/ServerRoomBody";
import Loader from "../../components/Loader/Loader";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const ServerRoomPage = () => {
  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");
  const { gameId } = useParams();
  const { userListRef } = useSocket(gameId, "", userInfo, "", "");
  const [searchedLists, setSearchedLists] = useState([]);
  const [isSearched, setIsSearched] = useState(0);
  const [loading, setLoading] = useState(false);

  //현재 온라인인 users의 길이
  const [headCount, setHeadCount] = useState(0);
  const searchHandler = async (title) => {
    const res = await axios.get(`${ENDPOINT}/rooms/search/${title}`);
    setSearchedLists(res.data);
    setIsSearched(1);
  };
  const getOnlineUserNum = () => {
    const length = userListRef.current.filter(
      (user) => user.connected === true
    ).length;
    setHeadCount(length);
  };
  useEffect(() => {
    getOnlineUserNum();
  }, [userListRef, getOnlineUserNum]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setLoading(true);
      }, 1500);
    }
  }, []);

  if (!loading) {
    return <Loader />;
  }

  return (
    <div className="server__container">
      <div className="server__nav">
        <NavBar />
      </div>
      <div className="server__main">
        <div className="server__main-container">
          <div className="server__main-header">
            <ServerRoomHeader gameId={gameId} headCount={headCount} />
          </div>
          <div></div>
          <div className="server__main-content">
            <div className="server__chat">
              <div className="server__search">
                <ServerSearch searchHandler={searchHandler} />
              </div>
              <div className="server__roomcard">
                <ServerRoomBody
                  searchedLists={searchedLists}
                  searched={isSearched}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="server__sidebar">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default ServerRoomPage;
