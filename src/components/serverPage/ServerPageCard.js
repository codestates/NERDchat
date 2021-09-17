import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import Bookmark from '../../UI/bookmark/Bookmark';
import './ServerPageCard.scss';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const ServerPageCard = ({ category, img, id, like }) => {
  const [clicked, setClicked] = useState(false);

  const addBookmarkHandler = async (e) => {
    e.preventDefault();
    // test용
    const accessToken = localStorage.getItem('ACT');
    // test용 끝
    const header = { authorization: `Bearer ${accessToken}` };
    const res = await axios.get(`${ENDPOINT}/favorites/request/${id}`, { headers: header, withCredentials: true });
    console.log(res.data.data);
    if (res.data.data) setClicked((prev) => !prev);
  };
  useEffect(() => {
    console.log('test', like);
    if (like) setClicked(true);
    else setClicked(false);
  }, []);
  return (
    <Link
      className='grid__items'
      style={{ textDecoration: 'none' }}
      to={`/${id}`}
    >
      <div
        className='game__list__card'
        style={{
          backgroundImage: `url(${img})`,
          // width: "100px",
          height: '250px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <p>{category}</p>
        <div className='bookmark__container' onClick={addBookmarkHandler}>
          {clicked ? <IoBookmark size={25} color='rgb(184, 126, 255)' /> : <Bookmark />}
        </div>
      </div>
    </Link>
  );
};

export default ServerPageCard;
