import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import {
  RiGoogleFill,
  RiKakaoTalkFill,
  RiFacebookBoxFill,
} from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import "./LoginBody.scss";

//엔드포인트 real로 변경 필요
const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_CLIENT_KEY;

const Login = () => {
  const history = useHistory();
  const { getUserInfo, isLoginHandler, loginmodalHandler } =
    useContext(Context);
  const idInputRef = useRef();
  const pwInputRef = useRef();
  const [err, setErr] = useState();

  // 일반 로그인
  const LoginHandler = async (e) => {
    setErr("");
    e.preventDefault();
    const enteredId = idInputRef.current.value;
    const enteredPw = pwInputRef.current.value;
    if (enteredId.trim().length < 4 || enteredId.trim().length > 25) {
      setErr("ID는 6자 이상이어야 합니다.");
    } else if (enteredPw.trim().length < 6) {
      setErr("PW는 6자 이상이어야 합니다.");
    }
    const headers = {
      id: enteredId,
      password: enteredPw,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
    const res = await axios.post(
      `${ENDPOINT}/login`,
      { data: null },
      { headers: headers, withCredentials: true }
    );

    // 받은 유저 정보 저장하기.
    // 쿠키에 userInfo저장하게 되는 함수
    getUserInfo(res.data.data);
    // login 상태 저장
    isLoginHandler();
    loginmodalHandler();
    history.push("/servers");
  };

  // 구글 로그인
  const googleHandler = () => {
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=code&scope=openid email&redirect_uri=${ENDPOINT}/oauth/google`
    );
    isLoginHandler();
  };
  // 카카오 로그인
  const kakaoHandler = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${ENDPOINT}/oauth/kakao&response_type=code`
    );
    isLoginHandler();
  };
  // 페이스북 로그인
  const facebookHandler = () => {
    window.location.assign(
      `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_ID}&redirect_uri=${ENDPOINT}/oauth/facebook&scope=email,public_profile`
    );
    isLoginHandler();
  };
  return (
    <>
      {err && (
        <div className="err__container">
          <p>{err}</p>
        </div>
      )}
      <form className="login__input__container" onSubmit={LoginHandler}>
        <div className="id__input__container">
          <input
            type="text"
            id="id"
            ref={idInputRef}
            required
            autocomplet="off"
            className="form-control"
            placeholder="ID"
          />
          <label htmlFor="id" className="form-label">
            ID
          </label>
        </div>
        <div className="pw__input__container">
          <input
            type="password"
            id="pw"
            ref={pwInputRef}
            placeholder="password"
            autocomplet="off"
            className="form-control"
            placeholder="PASSWORD"
          />
          <label htmlFor="pw" className="form-label">
            PASSWORD
          </label>
        </div>
        <button type="submit" className="LoginBtn">
          Login
        </button>
      </form>
      <div className="split__container">
        <div className="modal__split" />
        <p>OR</p>
        <div className="modal__split" />
      </div>
      <div className="social__login">
        <button onClick={googleHandler} className="social__login-btn">
          <div className="google">
            <FcGoogle size={27} />
          </div>
        </button>
        <button onClick={kakaoHandler} className="social__login-btn">
          <div className="kakao">
            <RiKakaoTalkFill size={30} />
          </div>
        </button>
        <button onClick={facebookHandler} className="social__login-btn">
          <div className="facebook">
            <RiFacebookBoxFill size={30} />
          </div>
        </button>
      </div>
    </>
  );
};

export default Login;
