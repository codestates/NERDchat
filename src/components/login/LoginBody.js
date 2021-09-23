import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import kakao from "./kakao.png";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import "./LoginBody.scss";

//엔드포인트 real로 변경 필요
const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_CLIENT_KEY;

const Login = () => {
  // console.log(ENDPOINT);
  // console.log(GOOGLE_CLIENT_ID);
  // console.log(FACEBOOK_ID);
  // console.log(KAKAO_REST_API_KEY);
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
      setErr("ID should be longer than 6 letters");
    } else if (enteredPw.trim().length < 6) {
      setErr("PW should be longer than 6 letters");
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
    // const token = res.headers.authorization
    // localStorage.setItem('ACT', token.split(' ')[1]);
    // console.log(token.split(' ')[1]);
    // 받은 유저 정보 저장하기.
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
  };
  // 카카오 로그인
  const kakaoHandler = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${ENDPOINT}/oauth/kakao&response_type=code`
    );
    // window.location.assign(FB_URL);
    // 인증됐는지 여부를 체크하는게 필요...;
    // localStorage.setItem('login', true);
  };
  // 페이스북 로그인
  const facebookHandler = () => {
    window.location.assign(
      `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_ID}&redirect_uri=${ENDPOINT}/oauth/facebook&scope=email,public_profile`
    );
    // 인증됐는지 여부를 체크하는게 필요...;
    // localStorage.setItem('login', true);
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
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" ref={idInputRef} />
        </div>
        <div className="pw__input__container">
          <label htmlFor="pw">비밀번호</label>
          <input type="password" id="pw" ref={pwInputRef} />
        </div>
        <button type="submit" className="LoginBtn">
          로그인
        </button>
      </form>
      <div className="split__container">
        <div className="modal__split" />
        <p>또는</p>
        <div className="modal__split" />
      </div>
      <div className="social__login">
        <button onClick={googleHandler}>
          <div className="google">
            <FcGoogle size={35} />
          </div>
        </button>
        <button onClick={kakaoHandler}>
          <div className="kakao">
            <img src={kakao} width="35px" alt="kakaoLogo" />
          </div>
        </button>
        <button onClick={facebookHandler}>
          <div className="facebook">
            <AiFillFacebook size={35} style={{ fill: "#4267B2" }} />
          </div>
        </button>
      </div>
    </>
  );
};

export default Login;
