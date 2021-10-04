import React, { useState, useEffect } from "react";

import NavBar from "../../components/NavBar/NavBar";
import BookMarkList from "../../components/MypageDashBoardContent/BookMarkList/BookMarkList";
import MessagesList from "../../components/MypageDashBoardContent/MessagesList/MessagesList";
import SettingInfo from "../../components/MypageDashBoardContent/SettingInfo/SettingInfo";
import { Cookies } from "react-cookie";

import {
  IoHomeOutline,
  IoChatbubblesOutline,
  IoSettingsOutline,
} from "react-icons/io5";

import "./MyPage.scss";

function MyPage() {
  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");
  const { avatar, nickname, status, email, oauth } = userInfo;
  const [profileImg, setProfileImg] = useState(null);
  const [tab, setTab] = useState(1);

  const actionhandle = (index) => {
    setTab(index);
  };
  useEffect(() => {
    setProfileImg(userInfo.avatar);
  }, [userInfo]);

  // const imagehandler = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setProfileImg(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  return (
    <div className="mypage__container">
      <div className="mypage__nav">
        <NavBar />
      </div>
      <div className="mypage__main">
        <div className="mypage__dashboard">
          <div className="mypage__dashboard-tabs">
            <div className="mypage__user">
              <img
                className="mypage__img"
                src={
                  avatar === null
                    ? require("../../images/dummy/white.jpeg").default
                    : avatar
                }
                alt=""
              />
              <h2 className="mypage__h2">{nickname}</h2>
              <h3 className="mypage__h3">{status}</h3>
            </div>
            <div className="mypage__tabs">
              <div
                onClick={() => actionhandle(1)}
                className={tab === 1 ? "mypage__tab active-tab" : "mypage__tab"}
              >
                <div className="mypage__tab-icon">
                  <IoHomeOutline size={25} />
                </div>
                <span className="mypage__tab-title">SERVERS</span>
              </div>
              <div
                onClick={() => actionhandle(2)}
                className={tab === 2 ? "mypage__tab active-tab" : "mypage__tab"}
              >
                <div className="mypage__tab-icon">
                  <IoChatbubblesOutline size={25} />
                </div>
                <span className="mypage__tab-title">FRIENDS</span>
              </div>
              <div
                onClick={() => actionhandle(3)}
                className={tab === 3 ? "mypage__tab active-tab" : "mypage__tab"}
              >
                <div className="mypage__tab-icon">
                  <IoSettingsOutline size={25} />
                </div>
                <span className="mypage__tab-title">SETTING</span>
              </div>
            </div>
          </div>
          <div className="mypage__dashboard-content">
            <div
              className={
                tab === 1 ? "mypage__content active-content" : "mypage__content"
              }
            >
              <BookMarkList />
            </div>
            <div
              className={
                tab === 2 ? "mypage__content active-content" : "mypage__content"
              }
            >
              <MessagesList />
            </div>
            <div
              className={
                tab === 3 ? "mypage__content active-content" : "mypage__content"
              }
            >
              <SettingInfo avatar={avatar} status={status} oauth={oauth} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
