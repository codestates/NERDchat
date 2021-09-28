import React, { useState } from "react";

import { IoAttachOutline } from "react-icons/io5";
import { Cookies } from "react-cookie";

import "./SettingInfo.scss";

function SettingInfo({ profileImg, setProfileImg }) {
  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");

  const { userId, avatar, nickname, status, email } = userInfo;

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
    <div className="setting-container">
      <div className="setting-main">
        <div className="setting-main-container">
          <div className="setting-main-content">
            <div className="setting-chat">
              <form action="form__input" className="setting-form">
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

              <div className="setting-info">
                <div className="setting-infomation">
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
                    type="text"
                    id="status"
                    className="form__input"
                    autocomplete="off"
                    placeholder=" "
                  />
                  <label htmlFor="status" className="form__label">
                    {status}
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

                <button type="submit" className="setting-button">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingInfo;
