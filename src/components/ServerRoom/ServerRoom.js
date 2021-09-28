import { useEffect, useState } from "react";
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
  const userInfo = cookies.get("userInfo");

  const { gameId } = useParams();
  const { message, sendMessage } = useSocket(gameId, "", userInfo);
  console.log("This is ServerRoom compo");
  const [searchedLists, setSearchedLists] = useState([]);
  const [isSearched, setIsSearched] = useState(0);
  const searchHandler = async (title) => {
    console.log(title);
    const res = await axios.get(`${ENDPOINT}/rooms/search/${title}`);
    setSearchedLists(res.data);
    setIsSearched(1);
  };

  return (
    <>
      <ServerRoomHeader gameId={gameId} />
      <ServerSearch searchHandler={searchHandler} />
      <ServerRoomBody searchedLists={searchedLists} searched={isSearched} />
    </>
  );
};

export default ServerRoom;
