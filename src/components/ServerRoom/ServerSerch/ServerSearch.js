import { useState, useEffect } from "react";
import "./ServerSearch.scss";
import { IoSearchOutline } from "react-icons/io5";

const ServerSearch = ({ searchHandler }) => {
  const [searchInput, setSearchInput] = useState("");
  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    searchHandler(searchInput);
  };
  return (
    <div className="server__search__container">
      <form className="search__container" onSubmit={submitHandler}>
        <div className="search_box">
          <div className="search_btn">
            <IoSearchOutline />
          </div>
          <input
            type="text"
            className="input_search"
            placeholder="Search a room"
            onChange={searchInputHandler}
          />
        </div>
      </form>
    </div>
  );
};

export default ServerSearch;

{
  /* <input placeholder="search a room" onChange={searchInputHandler} /> */
}
