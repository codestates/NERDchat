import { useState, useEffect } from "react";
import axios from "axios";
import ServerRoomBody from "./ServerRoomBody/ServerRoomBody";
import ServerRoomHeader from "./ServerRoomHeader/ServerRoomHeader";
import ServerSearch from "./ServerSerch/ServerSearch";
import useSocket from "../../hooks/useSocket";
import { useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const ServerRoom = () => {
  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");
  const { gameId } = useParams();
  const { userList } = useSocket(gameId, "", userInfo, "", "");
  const [searchedLists, setSearchedLists] = useState([]);
  const [isSearched, setIsSearched] = useState(0);
  //현재 온라인인 users의 길이
  const [headCount, setHeadCount] = useState(0);
  const searchHandler = async (title) => {
    const res = await axios.get(`${ENDPOINT}/rooms/search/${title}`);
    setSearchedLists(res.data);
    setIsSearched(1);
  };
  const getOnlineUserNum = () => {
    const length = userList.filter((user) => user.connected === true).length;
    setHeadCount(length);
  };
  useEffect(() => {
    getOnlineUserNum();
  }, [userList, getOnlineUserNum]);

  return (
    <>
      <ServerRoomHeader gameId={gameId} headCount={headCount} />
      <ServerSearch searchHandler={searchHandler} />
      <ServerRoomBody searchedLists={searchedLists} searched={isSearched} />
    </>
  );
};

export default ServerRoom;
