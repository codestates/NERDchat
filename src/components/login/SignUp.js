import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SignUp.scss';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const SignUp = () => {
  const [start, setStart] = useState(0);
  const [enteredId, setEnteredId] = useState('');
  const [idIsValid, setIdIsValid] = useState(true);
  const [enteredNickname, setEnteredNickname] = useState('');
  const [nicknameIsValid, setNicknameIsValid] = useState(true);
  const [enteredPw, setEnteredPw] = useState('');
  const [pwIsValid, setPwIsValid] = useState(true);
  const [enteredPwc, setEnteredPwc] = useState('');
  const [pwcIsValid, setPwcIsValid] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [verifyCode, setVerifyCode] = useState('123');
  const [enteredVerifyCode, setEnteredVerifyCode] = useState('123');
  const [emailIsVerified, setEmailIsVerified] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const verifier = setTimeout(() => {
      if (enteredId.length !== 0) {
        if (enteredId.trim().length >= 4 && enteredId.trim().length <= 25) {
          setIdIsValid(true);
        } else { setIdIsValid(false); }
      }

      if (enteredNickname.length !== 0) {
        if (enteredNickname.trim().length >= 4 && enteredNickname.trim().length <= 25) {
          setNicknameIsValid(true);
        } else setNicknameIsValid(false);
      }
      if (enteredPw.length !== 0) {
        validatePasswordHandler(enteredPw);
      }
      if (enteredPwc.length !== 0) {
        if (enteredPwc === enteredPw) {
          setPwcIsValid(true);
        } else setPwcIsValid(false);
      }

      if (enteredEmail.length !== 0) {
        validateEmailHandler(enteredEmail);
      }
    }, 700);

    return () => {
      clearTimeout(verifier);
    };
  }, [enteredId, enteredNickname, enteredPw, enteredEmail, enteredPwc]);

  useEffect(() => {
    const verifyForm = setTimeout(() => {
      if (idIsValid && nicknameIsValid && pwIsValid && pwcIsValid && emailIsValid && emailIsVerified) setFormIsValid(true);
      else setFormIsValid(false);
    }, 500);
    return () => clearTimeout(verifyForm);
  }, [idIsValid, nicknameIsValid, pwIsValid, pwcIsValid, emailIsValid, emailIsVerified]);

  const validatePasswordHandler = pw => {
    const regPw = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    if (!regPw.test(pw)) setPwIsValid(false);
    else setPwIsValid(true);
  };
  const validateEmailHandler = em => {
    const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!regEmail.test(em)) setEmailIsValid(false);
    else setEmailIsValid(true);
  };
  const idHandler = (e) => {
    setEnteredId(e.target.value);
  };
  const nicknameHandler = (e) => {
    setEnteredNickname(e.target.value);
  };
  const pwHandler = (e) => {
    setEnteredPw(e.target.value);
  };
  const pwcHandler = (e) => {
    setEnteredPwc(e.target.value);
  };
  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const signUpHandler = async (event) => {
    event.preventDefault();
    const res = await axios.put(`${ENDPOINT}/signup`, { id: enteredId, password: enteredPw, email: enteredEmail, nickname: enteredNickname });
    console.log(res);
  };
  const sendEmailHandler = async () => {
    const res = await axios.put(`${ENDPOINT}/emailV`, { email: enteredEmail });
    // const res.data.verifyToken
    setVerifyCode(res.data.verifyToken);
  };
  const codeHandler = (e) => {
    setEnteredVerifyCode(e.target.value);
  };
  const emailCodeHandler = (e) => {
    if (enteredVerifyCode === verifyCode) setEmailIsVerified(true);
    else setEmailIsVerified(false);
    console.log(emailIsVerified);
  };
  return (
    <>
      <form className='login__input__container' onSubmit={signUpHandler}>
        <div className='id__input__container'>
          <label htmlFor='id'>아이디</label>
          <input type='text' id='id' onChange={idHandler} />
          {!idIsValid && <p className='errMsg'>*ID는 4자에서 25자 사이어야 합니다.</p>}
        </div>
        <div className='nickname__input__container'>
          <label htmlFor='nickname'>닉네임</label>
          <input type='text' id='nickname' onChange={nicknameHandler} />
          {!nicknameIsValid && <p className='errMsg'>*닉네임은 4자에서 25자 사이어야 합니다.</p>}
        </div>
        <div className='pw__input__container'>
          <label htmlFor='pw'>비밀번호</label>
          <input type='password' id='pw' onChange={pwHandler} />
          {!pwIsValid && <p className='errMsg'>*비밀번호는 영문,숫자 혼합 6자이상 이어야 합니다.</p>}
        </div>
        <div className='pwc__input__container'>
          <label htmlFor='pwc'>비밀번호 확인</label>
          <input type='password' id='pwc' onChange={pwcHandler} />
          {!pwcIsValid && <p className='errMsg'>*비밀번호가 일치하지 않습니다.</p>}
        </div>
        <div className='email__input__container'>
          <label htmlFor='email'>이메일</label>
          <div className='verify__email__container'>
            <input type='text' id='email' onChange={emailHandler} />
            {!emailIsValid && <p className='errMsg'>*유효한 이메일 주소를 입력해주세요.</p>}
            <button type='button' className={emailIsValid ? 'verify__email__btn' : 'verify__email__btn'} disabled={!emailIsValid} onClick={sendEmailHandler}>이메일 인증하기</button>
          </div>
        </div>
        <div className='verify__email__input__container'>
          <label htmlFor='vemail'>이메일 인증번호</label>
          <input type='text' id='vemail' onChange={codeHandler} />
          <button type='button' className='email__code__btn' onClick={emailCodeHandler}>인증하기</button>
        </div>
        <div>
          <p className='contract'>
            회원으로 가입하면 서비스 약관과 개인정보 처리방침을 읽고 이해한 것으로
            간주됩니다.
          </p>
        </div>
        <button type='submit' className={formIsValid ? 'signUpBtn' : 'disabledBtn'} disabled={!formIsValid}>회원가입</button>
      </form>
    </>
  );
};

export default SignUp;
