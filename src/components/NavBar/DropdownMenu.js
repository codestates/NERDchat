import React, { useState } from 'react';
import DropdownItem from './DropdownItem';
import { IoAttachOutline } from 'react-icons/io5';

import './DropdownMenu.scss';

const DropdownMenu = () => {
  const [gameList, setGameList] = useState('Empty');

  return (
    <div className='dropdown'>
      <DropdownItem leftIcon={<IoAttachOutline />} gameList={gameList} />
      <DropdownItem leftIcon={<IoAttachOutline />} gameList={gameList} />
      <DropdownItem leftIcon={<IoAttachOutline />} gameList={gameList} />
      <DropdownItem leftIcon={<IoAttachOutline />} gameList={gameList} />
      <DropdownItem leftIcon={<IoAttachOutline />} gameList={gameList} />
    </div>
  );
};

export default DropdownMenu;
