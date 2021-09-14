import React from 'react';

import './DropdownItem.scss';

const DropdownItem = ({ leftIcon, gameList }) => {
  return (
    <div>
      <a href='#' className='drop-menu-item'>
        <span className='drop-icon-button'>{leftIcon}</span>
        <span className='drop-game-list'>{gameList}</span>
      </a>
    </div>
  );
};

export default DropdownItem;
