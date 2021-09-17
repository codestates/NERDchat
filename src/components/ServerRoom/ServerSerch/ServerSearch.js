import { useState, useEffect } from 'react';
import './ServerSearch.scss';
import { IoSearchOutline } from 'react-icons/io5';

const ServerSearch = ({ searchHandler }) => {
  const [searchInput, setSearchInput] = useState('');
  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    searchHandler(searchInput);
  };
  return (
    <div className='server__search__container'>
      <form className='search__container' onSubmit={submitHandler}>
        <input placeholder='search a room' onChange={searchInputHandler} />

        <button type='submit'><IoSearchOutline className='server__search__icon' /></button>
      </form>
    </div>
  );
};

export default ServerSearch;
