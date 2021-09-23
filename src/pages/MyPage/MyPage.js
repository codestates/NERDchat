import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../UI/SideBar/SideBar";

import { IoImagesOutline, IoAttachOutline } from "react-icons/io5";

import { Cookies } from "react-cookie";
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

  console.log(profileImg);
  console.log(userId, avatar, nickname, status);
  return (
    <div className="mypage-container">
      <div className="mypage-nav">
        <NavBar />
      </div>
      <div className="mypage-main">
        <div className="mypage-main-container">
          <div className="mypage-main-content">
            <div className="mypage-chat">
              <div className="mypage-card">
                <div className="mypage-photo">
                  <h3>WELCOM,</h3>
                  <div className="mypage-nickname">
                    <h1>{nickname}</h1>
                  </div>
                  <img src={avatar === null ? profileImg : avatar} alt="" />
                </div>
                <form action="form__input" className="mypage-form">
                  <label htmlFor="form__input" className="form__label">
                    <input
                      type="file"
                      id="form__input"
                      className="form__input"
                      accept="image/*"
                      onChange={imagehandler}
                    />
                    {/* <img
                      src={require("../../images/dummy/icon.png").default}
                      className="form__icon"
                      alt=""
                    /> */}
                    <IoAttachOutline className="form__icon" />
                    <span className="form__text">Choose a Photo</span>
                  </label>
                </form>
                <div className="mypage-status">
                  {/* <p>What are you thinking?</p> */}
                  <textarea spellcheck="false">{status}</textarea>
                </div>
              </div>
              <div className="mypage-info">
                <div className="mypage-infomation">
                  <h2>INFORMATION</h2>
                </div>
                <div className="form">
                  <input
                    type="text"
                    id="email"
                    className="form__input"
                    autocomplete="off"
                    placeholder=" "
                    disabled
                  />
                  <label htmlFor="email" className="form__label">
                    {email}
                  </label>
                </div>
                <div className="form">
                  <input
                    type="password"
                    id="password"
                    className="form__input"
                    autocomplete="off"
                    placeholder=" "
                  />
                  <label htmlFor="password" className="form__label">
                    Password
                  </label>
                </div>
                <div className="form">
                  <input
                    type="password"
                    id="passwordConfrim"
                    className="form__input"
                    autocomplete="off"
                    placeholder=" "
                  />
                  <label htmlFor="passwordConfrim" className="form__label">
                    Confrim Password
                  </label>
                </div>

                <button type="submit" className="mypage-button">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mypage-sidebar">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
