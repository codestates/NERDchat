import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import './SearchBar.scss';

const SearchBar = () => {
  return (
    <div className='flexbox'>
      <div className='search'>
        <div>
          <input type='text' placeholder='Search . . .' required />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
