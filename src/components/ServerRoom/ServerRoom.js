import { useEffect, useState } from "react";
import axios from "axios";
import ServerRoomBody from "./ServerRoomBody/ServerRoomBody";
import ServerRoomHeader from "./ServerRoomHeader/ServerRoomHeader";
import ServerSearch from "./ServerSerch/ServerSearch";
import useSocket from "../../hooks/useSocket";
import { useParams } from "react-router-dom";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const ServerRoom = () => {
  const { gameId } = useParams();
  // console.log(gameId)
  const [searchedLists, setSearchedLists] = useState([]);
  const [isSearched, setIsSearched] = useState(0);
  const searchHandler = async (title) => {
    console.log(title);
    const res = await axios.get(`${ENDPOINT}/rooms/search/${title}`);
    setSearchedLists(res.data);
    setIsSearched(1);
  };
  const { message, sendMessage } = useSocket(gameId, "");

  return (
    <>
      <ServerRoomHeader />
      <ServerSearch searchHandler={searchHandler} />
      <ServerRoomBody searchedLists={searchedLists} searched={isSearched} />
    </>
  );
};

export default ServerRoom;