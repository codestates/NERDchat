import React, { useRef, useState } from "react";
import { IoAttachOutline } from "react-icons/io5";
import { Cookies } from "react-cookie";
import axios from "axios";
import "./SettingInfo.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

function SettingInfo({ profileImg, setProfileImg }) {
  const cookies = new Cookies();
  let userInfo = cookies.get("userInfo");
  const nicknameRef = useRef();
  const passwordRef = useRef();
  const statusRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);
  const [pImage, setPImage] = useState(null);
  const { userId, avatar, nickname, status, email } = userInfo;

  const imagehandler = (e) => {
    setPImage(e.target.files);
    // const reader = new FileReader();
    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setProfileImg(reader.result);
    //   }
    // };
    // reader.readAsDataURL(e.target.files[0]);
  };

  const confirmPwHandler = (e) => {
    if (
      e.target.value === passwordRef.current.value &&
      nicknameRef.current.value.length > 2 &&
      passwordRef.current.value.length > 6 &&
      statusRef.current.value.length > 2
    ) {
      setFormIsValid(true);
    } else setFormIsValid(false);
  };

  const fixInfoHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (pImage.length > 0) {
      for (let i = 0; i < pImage.length; i++) {
        const imgForm = pImage[i];
        formData.append("avatar", imgForm, imgForm.name);
      }
    }
    formData.append("nickname", nicknameRef.current.value);
    formData.append("password", passwordRef.current.value);
    formData.append("status", statusRef.current.value);
    for (let key of formData.keys()) {
      console.log(key);
    }
    for (let value of formData.values()) {
      console.log(value);
    }
    // const config = {
    //   headers: { "content-type": "multipart/form-data" },
    //   withCredentials: true,
    // };
    // const res = await axios.patch(`${ENDPOINT}/fixprofile`, formData, config);
    const res = await axios({
      method: "patch",
      url: `${ENDPOINT}/fixprofile`,
      data: formData,
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    });

    console.log(res);
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
                    name="pImage"
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

              <form onSubmit={fixInfoHandler}>
                <div className="setting-info">
                  <div className="setting-infomation">
                    <h2>INFORMATION</h2>
                  </div>
                  <div className="form">
                    <input
                      type="text"
                      id="email"
                      className="form__input"
                      autoComplete="off"
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
                      id="nickname"
                      className="form__input"
                      autoComplete="off"
                      placeholder=" "
                      ref={nicknameRef}
                    />
                    <label htmlFor="nickname" className="form__label">
                      Nickname
                    </label>
                  </div>
                  <div className="form">
                    <input
                      type="text"
                      id="status"
                      className="form__input"
                      autoComplete="off"
                      placeholder=" "
                      ref={statusRef}
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
                      autoComplete="off"
                      placeholder=" "
                      ref={passwordRef}
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
                      autoComplete="off"
                      placeholder=" "
                      onChange={confirmPwHandler}
                    />
                    <label htmlFor="passwordConfrim" className="form__label">
                      Confrim Password
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="setting-button"
                    // disabled={formIsValid ? false : true}
                  >
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingInfo;
