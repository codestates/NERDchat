import { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import DropdownItem from "./DropdownItem";

import "./DropdownMenu.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const DropdownMenu = ({ backgroundCloseHandler }) => {
  const dropdownRef = useRef();
  const [gameList, setGameList] = useState([]);
  const history = useHistory();

  const getFavList = async () => {
    const res = await axios.get(`${ENDPOINT}/favorites/lists`, {
      withCredentials: true,
    });
    // const listTitle = res.data.data.map((item) => item.GameCategory.category);
    setGameList(res.data.data);
  };

  useEffect(() => {
    getFavList();
  }, []);

  useEffect(() => {
    console.log(8888, dropdownRef.current);
    dropdownRef.current.focus();
  }, []);
  const clickHandler = (gameId) => {
    const path = `/gameId=${gameId}`;
    history.push(path);
    window.location.reload();
  };
  return (
    <div
      className="dropdown"
      tabIndex={0}
      ref={dropdownRef}
      onBlur={backgroundCloseHandler}
    >
      {gameList.length === 0 && <DropdownItem gameList="Bookmark is empty" />}
      {gameList.map((list) => {
        return (
          <div
            key={list.GameCategory.category}
            onClick={() => clickHandler(list.gameId)}
          >
            <DropdownItem gameList={list.GameCategory.category} />
          </div>
        );
      })}
    </div>
  );
};

export default DropdownMenu;
