import React, { useEffect, useState } from 'react';
import { IoBatteryFull, IoBatteryDead } from 'react-icons/io5';

import './OnlineUser.scss';
const PAGE_NUMBER = 1;
function OnlineUser () {
  const [userName, setUserName] = useState('Nickname');

  const [state, setState] = useState([]);
  const [page, setPage] = useState(PAGE_NUMBER);

  return (
    <div className='userlist'>
      <div className='useronline'>
        <div className='user-container'>
          <img
            className='onlinefriend'
            src={require('../../../images/dummy/white.jpeg').default}
            alt=''
          />
          <span className='onlinefriendname'>{userName}</span>
        </div>
        <div className='user-container'>
          <img
            className='onlinefriend'
            src={require('../../../images/dummy/white.jpeg').default}
            alt=''
          />
          <span className='onlinefriendname'>{userName}</span>
        </div>
        <div className='user-container'>
          <img
            className='onlinefriend'
            src={require('../../../images/dummy/white.jpeg').default}
            alt=''
          />
          <span className='onlinefriendname'>{userName}</span>
        </div>
        <div className='user-container'>
          <img
            className='onlinefriend'
            src={require('../../../images/dummy/white.jpeg').default}
            alt=''
          />
          <span className='onlinefriendname'>{userName}</span>
        </div>
        <div className='user-container'>
          <img
            className='onlinefriend'
            src={require('../../../images/dummy/white.jpeg').default}
            alt=''
          />
          <span className='onlinefriendname'>{userName}</span>
        </div>
        <div className='user-container'>
          <img
            className='onlinefriend'
            src={require('../../../images/dummy/white.jpeg').default}
            alt=''
          />
          <span className='onlinefriendname'>{userName}</span>
        </div>
        <div className='user-container'>
          <img
            className='onlinefriend'
            src={require('../../../images/dummy/white.jpeg').default}
            alt=''
          />
          <span className='onlinefriendname'>{userName}</span>
        </div>
        <div className='user-container'>
          <img
            className='onlinefriend'
            src={require('../../../images/dummy/white.jpeg').default}
            alt=''
          />
          <span className='onlinefriendname'>{userName}</span>
        </div>
        <div className='user-container'>
          <img
            className='onlinefriend'
            src={require('../../../images/dummy/white.jpeg').default}
            alt=''
          />
          <span className='onlinefriendname'>{userName}</span>
        </div>
        <div className='user-container'>
          <img
            className='onlinefriend'
            src={require('../../../images/dummy/white.jpeg').default}
            alt=''
          />
          <span className='onlinefriendname'>{userName}</span>
        </div>
        <div className='user-container'>
          <img
            className='onlinefriend'
            src={require('../../../images/dummy/white.jpeg').default}
            alt=''
          />
          <span className='onlinefriendname'>{userName}</span>
        </div>
      </div>
    </div>
  );
}

export default OnlineUser;
