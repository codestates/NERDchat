import React, { useState, useEffect, useContext } from "react";

import NavBar from "../../components/NavBar/NavBar";
import SettingInfo from "../../components/MypageDashBoardContent/SettingInfo/SettingInfo";
import { Cookies } from "react-cookie";
import { Context } from "../../context/ContextProvider";

import { IoPersonCircleOutline } from "react-icons/io5";

import "./MyPage.scss";

function MyPage() {
  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");
  const { avatar, nickname, status, email, oauth } = userInfo;
  const [profileImg, setProfileImg] = useState(null);
  const { friends } = useContext(Context);
  console.log(friends.length);

  useEffect(() => {
    setProfileImg(userInfo.avatar);
  }, [userInfo]);

  return (
    <div className="mypage__container">
      <div className="mypage__nav">
        <NavBar />
      </div>
      <div className="mypage__show">
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
            <div className="mypage__name">{nickname}</div>
            <div className="mypage__status">{status}</div>
            <div className="mypage__email">{email}</div>
            <div className="mypage__fri">
              <IoPersonCircleOutline size={24} className="margin__10px" />
              Followers: {friends.length}
            </div>
          </div>
        </div>
        <div>
          <SettingInfo avatar={avatar} status={status} oauth={oauth} />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
