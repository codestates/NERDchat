import React, { useState, useEffect } from "react";

import NavBar from "../../components/NavBar/NavBar";
import SettingInfo from "../../components/MypageDashBoardContent/SettingInfo/SettingInfo";
import { Cookies } from "react-cookie";

import "./MyPage.scss";

function MyPage() {
  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");
  const { avatar, nickname, status, email, oauth } = userInfo;
  const [profileImg, setProfileImg] = useState(null);
  const [tab, setTab] = useState(3);

  useEffect(() => {
    setProfileImg(userInfo.avatar);
  }, [userInfo]);

  return (
    <div className="mypage__container">
      <div className="mypage__nav">
        <NavBar />
      </div>
      <div className="mypage__profile">
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
        </div>
      </div>
    </div>
  );
}

export default MyPage;
