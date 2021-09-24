import React, { useEffect, useState } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
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

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = game.filter((value) => {
      return value.category.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          className="searchInputs-input"
          type="text"
          placeholder="Search the Game"
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <IoSearchOutline className="searchIcon-search" />
          ) : (
            <IoCloseOutline id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return (
              <a className="dataItem" target="_blank" key={key}>
                <p className="dataItem-p">{value.category}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
