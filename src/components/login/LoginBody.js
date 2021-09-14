import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import kakao from './kakao.png';
import './LoginBody.scss';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  const idInputRef = useRef();
  const pwInputRef = useRef();
  const [err, setErr] = useState();

  // 일반 로그인
  const LoginHandler = async (e) => {
    setErr('');
    e.preventDefault();
    const enteredId = idInputRef.current.value;
    const enteredPw = pwInputRef.current.value;
    if (enteredId.trim().length < 4 || enteredId.trim().length > 25) {
      setErr('ID should be longer than 6 letters');
    } else if (enteredPw.trim().length < 6) {
      setErr('PW should be longer than 6 letters');
    }
    const headers = { id: enteredId, password: enteredPw, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
    const res = await axios.post(`${ENDPOINT}/login`, { data: null }, { headers: headers, withCredentials:true});
    // 받은 유저 정보 저장하기. redux...? or context...?
    // setUserInfo(res.data.data)
    // login 상태 저장
    // setLogin(true);
    console.log(res.data);
  };

  // 구글 로그인
  const googleHandler = () => {
    console.log(1);
    // window.location.assign(Google_URL);
    // 인증됐는지 여부를 체크하는게 필요...;
    // localStorage.setItem('login', true);
  };
  // 카카오 로그인
  const kakaoHandler = () => {
    console.log(1);
    // window.location.assign(FB_URL);
    // 인증됐는지 여부를 체크하는게 필요...;
    // localStorage.setItem('login', true);
  };
  // 페이스북 로그인
  const facebookHandler = () => {
    console.log(1);
    // window.location.assign(FB_URL);
    // 인증됐는지 여부를 체크하는게 필요...;
    // localStorage.setItem('login', true);
  };
  return (
    <>
      {err && <div className='err__container'><p>{err}</p></div>}
      <form className='login__input__container' onSubmit={LoginHandler}>
        <div className='id__input__container'>
          <label htmlFor='id'>아이디</label>
          <input type='text' id='id' ref={idInputRef} />
        </div>
        <div className='pw__input__container'>
          <label htmlFor='pw'>비밀번호</label>
          <input type='password' id='pw' ref={pwInputRef} />
        </div>
        <button type='submit' className='LoginBtn'>로그인</button>
      </form>
      <div className='split__container'>
        <div className='modal__split' />
        <p>또는</p>
        <div className='modal__split' />
      </div>
      <div className='social__login'>
        <button onClick={googleHandler}>
          <div className='google'>
            <FcGoogle size={35} />
          </div>
        </button>
        <button onClick={kakaoHandler}>
          <div className='kakao'>
            <img src={kakao} width='35px' alt='kakaoLogo' />
          </div>
        </button>
        <button onClick={facebookHandler}>
          <div className='facebook'>
            <AiFillFacebook size={35} style={{ fill: '#4267B2' }} />
          </div>
        </button>
      </div>
    </>
  );
};

export default Login;
