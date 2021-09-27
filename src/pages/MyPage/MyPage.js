import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";

import { Cookies } from "react-cookie";

import {
  IoHomeOutline,
  IoChatbubblesOutline,
  IoBookOutline,
  IoSettingsOutline,
} from "react-icons/io5";

import "./MyPage.scss";

function MyPage() {
  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");

  const { userId, avatar, nickname, status, email } = userInfo;

  const [profileImg, setProfileImg] = useState(
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8NDQ0NDQ0NDQ0NDQ0NDQ0NDw8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFgoNDisZEx4rKy0rKys3LS0rKysrKystKystKy0rKysrKysrLSsrKzcrKys3KysrKzcrKystNy0rK//AABEIAKgBLAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAHRABAQACAgMBAAAAAAAAAAAAAAERYSExAnGRUf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDuIAAAJZ13woAigAkqgAAAAAAAAAAAAAACKAAAz4+OM825tvNzjU00AAAAAAACKAAAAAAAIoAigIKAgoAAAioCiWbxudxQAARQABAUAAAAEwAoAAAigCKAAgCooCKAAACKAgoAAAgoIogKigIoACKAACKAAAIACiVQAQBUUEUAAARQAABFABFAAQFEUAEBQABFAAAAAABFABFAAARUAUAAAAAARQBFBFAARQAQFEAUQBQAAAAAAQFBAURQBFAAAAAEUASzjvG5jMUAAEUABFAAAAAAAAAAAAAEUAABIoAkUARQAAAABFARUUBFAAAAAAAAABFAAAAAABFAAAAABFAAARQAAAAABAVBQBFAABBUBRAFABAAVFAEVAUQBUAFQkUARQRUgCiAKIAoigCAKCAoAIogKAAIoIogKAAIoAICoqAoAIoACAKAAgoAgCiAKgAAACgCKAigACAqKACKCSKAIKAgoAgAoICooCKACKAigAIAqKAigACAoJZ7+0FAAAAABAAJ1+7UAAAAAEUBBQBFAAARQARQAAEUARQAQAUAEUAf/9k="
  );

  const imagehandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="mypage__container">
      <div className="mypage__nav">
        <NavBar />
      </div>
      <div className="mypage__main">
        <div className="mypage__dashboard">
          <div className="mypage__user">
            <img src={avatar === null ? profileImg : avatar} alt="" />
            <h3>{nickname}</h3>
            <textarea>{status}</textarea>
          </div>
          <div className="mypage__links">
            <div className="mypage__link">
              <IoHomeOutline />
              <h2>HOME</h2>
            </div>
            <div className="mypage__link">
              <IoChatbubblesOutline />
              <h2>MESSAGE</h2>
            </div>
            <div className="mypage__link">
              <IoBookOutline />
              <h2>BOOKMARK</h2>
            </div>
            <div className="mypage__link">
              <IoSettingsOutline />
              <h2>SETTING</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
