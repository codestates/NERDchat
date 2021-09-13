import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import kakao from './kakao.png';

import './LoginBody.scss';

const Login = () => {
  const idInputRef = useRef();
  const pwInputRef = useRef();
  const [err, setErr] = useState();
  const LoginHandler = (e) => {
    e.preventDefault();
    const enteredId = idInputRef.current.value;
    const enteredPw = pwInputRef.current.value;
    if (enteredId.trim().length < 6) {
      setErr('ID should be longer than 6 letters');
    } else if (enteredPw.trim().length < 8) {
      setErr('PW should be longer than 6 letters');
    }
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
        <button>
          <div className='google'>
            <FcGoogle size={35} />
          </div>
        </button>
        <button>
          <div className='kakao'>
            <img src={kakao} width='35px' alt='kakaoLogo' />
          </div>
        </button>
        <button>
          <div className='facebook'>
            <AiFillFacebook size={35} style={{ fill: '#4267B2' }} />
          </div>
        </button>
      </div>
    </>
  );
};

export default Login;
