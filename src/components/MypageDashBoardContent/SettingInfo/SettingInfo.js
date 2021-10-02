import React, { useRef, useState, useEffect } from "react";
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
  const [pwd, setPwd] = useState("");
  const [cPwd, setCPwd] = useState("");

  const { email } = userInfo;

  useEffect(() => {
    if (pwd.length > 0 && cPwd.length > 0 && pwd === cPwd) {
      setFormIsValid(true);
    } else setFormIsValid(false);
  }, [pwd, cPwd]);

  const imagehandler = (e) => {
    setPImage(e.target.files);
  };
  const pwdHandler = (e) => {
    setPwd(e.target.value);
  };
  const confirmPwHandler = (e) => {
    setCPwd(e.target.value);
  };

  //수정된 정보 서버로 보내기
  const fixInfoHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (pImage) {
      for (let i = 0; i < pImage.length; i++) {
        const imgForm = pImage[i];
        formData.append("avatar", imgForm, imgForm.name);
      }
    }
    if (nicknameRef.current.value.length > 0) {
      formData.append("nickname", nicknameRef.current.value);
    }
    if (statusRef.current.value.length > 0) {
      formData.append("status", statusRef.current.value);
    }
    formData.append("password", pwd);

    //formData의 데이터 읽는 방법
    // for (let key of formData.keys()) {
    //   console.log(key);
    // }
    // for (let value of formData.values()) {
    //   console.log(value);
    // }

    const res = await axios({
      method: "patch",
      url: `${ENDPOINT}/fixprofile`,
      data: formData,
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    });

    // res 형식: "data": {
    //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM2M5QG5hdmVyLmNvbSIsIm5pY2tuYW1lIjoibW9tbyIsImlhdCI6MTYzMzE1NTc1MywiZXhwIjoxNjMzMjQyMTUzfQ.LIZYoRnG8sVlKGuLo9MOUN84Iw2RihPT_eJqrO6R3aU",
    //     "id": 4,
    //     "avatar": "https://nerd-client.s3.amazonaws.com/avatar/1633155749493_UiHmUcGj0a9OBnxPXq7SifGcp.png",
    //     "userId": "hohoho",
    //     "nickname": "momo",
    //     "email": "123c9@naver.com",
    //     "status": null
    // }
    // console.log(777777, res.data.data);

    //정보 쿠키에 반영하고, 저장해주는 것 필요.
    cookies.set("userInfo", res.data.data);

    //바로 반영하기 위해, 새로고침하기
    window.location.reload();
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
                      Status
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
                      onChange={pwdHandler}
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
                    disabled={formIsValid ? false : true}
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
