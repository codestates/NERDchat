import React, { useEffect, useState } from "react";
import axios from "axios";

import "./SearchBar.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

function SearchBar() {
  const [game, setGame] = useState([]);
  useEffect(() => {
    axios.get(`${ENDPOINT}/category/lists/1`).then((res) => {
      setGame(res.data.data);
    });
  }, []);
  console.log(game);
  return (
    <div className="search__container">
      <div className="search__inputs">
        <input type="text" placeholder="Enter the Game Name" />
        <div className="search__icon"></div>
      </div>
      <div className="search__data"></div>
    </div>
  );
}

export default SearchBar;
