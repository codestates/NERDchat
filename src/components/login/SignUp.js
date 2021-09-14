import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SignUp.scss';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const SignUp = () => {
  const [enteredInfo, setEnteredInfo] = useState({
    id:'', 
    idIsValid:true, 
    nickname:'', 
    nicknameIsValid:true, 
    pw:'', 
    pwIsValid:true, 
    pwc:'',
    pwcIsValid:true,
    email:'', 
    emailIsValid:true, 
    verifyCode: '',
  })
    const [AVerifyCode, setAVerifyCode] = useState("123");
    const [emailIsVerified, setEmailIsVerified] = useState(false);
    const [confirmClicked, setConfirmClicked] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

  // 인풋값 유효성검사
  const {id, idIsValid, nickname, nicknameIsValid, pw, pwIsValid, pwc, pwcIsValid, email, emailIsValid, verifyCode} = enteredInfo
  useEffect(() => {
    const verifier = setTimeout(() => {
      if (id.length !== 0) {
        if (id.trim().length >= 4 && id.trim().length <= 25) {
          setEnteredInfo((prev) => {return {...prev, idIsValid:true}});
        } else { setEnteredInfo((prev) => {return {...prev, idIsValid:false}}); }
      }

      if (nickname.length !== 0) {
        if (nickname.trim().length >= 4 && nickname.trim().length <= 25) {
          setEnteredInfo((prev) => {return {...prev, nicknameIsValid:true}});
        } else setEnteredInfo((prev) => {return {...prev, nicknameIsValid:false}});
      }
      if (pw.length !== 0) {
        validatePasswordHandler(pw);
      }
      if (pwc.length !== 0) {
        if (pwc === pw) {
          setEnteredInfo((prev) => {return {...prev, pwcIsValid:true}});
        } else setEnteredInfo((prev) => {return {...prev, pwcIsValid:false}});
      }

      if (email.length !== 0) {
        validateEmailHandler(email);
      }
    }, 700);

    return () => {
      clearTimeout(verifier);
    };
  }, [id, nickname, pw, email, pwc]);

  useEffect(() => {
    const verifyForm = setTimeout(() => {
      if (idIsValid && nicknameIsValid && pwIsValid && pwcIsValid && emailIsValid && emailIsVerified && id.length !== 0 && nickname.length !== 0 && pw.length !== 0 && email.length !== 0 && pwc.length !== 0) setFormIsValid(true);
      else setFormIsValid(false);
    }, 500);
    return () => clearTimeout(verifyForm);
  }, [idIsValid, nicknameIsValid, pwIsValid, pwcIsValid, emailIsValid, emailIsVerified]);

  const validatePasswordHandler = pw => {
    const regPw = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    if (!regPw.test(pw)) setEnteredInfo((prev) => {return {...prev, pwIsValid:false}});
    else setEnteredInfo((prev) => {return {...prev, pwIsValid:true}});
  };
  const validateEmailHandler = em => {
    const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!regEmail.test(em)) setEnteredInfo((prev) => {return {...prev, emailIsValid:false}});
    else setEnteredInfo((prev) => {return {...prev, emailIsValid:true}});
  };
  const idHandler = (e) => {
    setEnteredInfo((prev) => {return {...prev, id:e.target.value}});
  };
  const nicknameHandler = (e) => {
    setEnteredInfo((prev) => {return {...prev, nickname:e.target.value}});
  };
  const pwHandler = (e) => {
    setEnteredInfo((prev) => {return {...prev, pw:e.target.value}});
  };
  const pwcHandler = (e) => {
    setEnteredInfo((prev) => {return {...prev, pwc:e.target.value}});
  };
  const emailHandler = (e) => {
    setEnteredInfo((prev) => {return {...prev, email:e.target.value}});
  };

  // 이메일 인증 요청
  const sendEmailHandler = async () => {
    const res = await axios.put(`${ENDPOINT}/emailV`, { email });
    // const res.data.verifyToken
    setAVerifyCode(res.data.data.verifyToken);
  };

  // 이메일 인증코드 입력
  const codeHandler = (e) => {
    setEnteredInfo((prev) => {return {...prev, verifyCode:e.target.value}});
  };
  // 이메일 인증코드 확인
  const emailCodeHandler = (e) => {
    setConfirmClicked(true);
    if (verifyCode === AVerifyCode) setEmailIsVerified(true);
    else setEmailIsVerified(false)
    // console.log(emailIsVerified);
  };
  // 회원가입 요청
  const signUpHandler = async (event) => {
    event.preventDefault();
    const res = await axios.put(`${ENDPOINT}/signup`, { id, pw, email, nickname});
    console.log(res);
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
            <button type='button' className={emailIsValid ? 'verify__email__btn' : 'verify__email__btn'} disabled={!emailIsValid} onClick={sendEmailHandler}>이메일 인증하기</button>
          </div>
          {!emailIsValid && <p className='errMsg'>*유효한 이메일 주소를 입력해주세요.</p>}
        </div>
        <div className='verify__email__input__container'>
          <label htmlFor='vemail'>이메일 인증번호</label>
          <div className='email__code__container'>
            <input type='text' id='vemail' onChange={codeHandler} className='code__input' />
            <button type='button' className='email__code__btn' onClick={emailCodeHandler}>인증하기</button>
          </div>
          {(!emailIsVerified && verifyCode.length !== 0 && confirmClicked) && <p className='errMsg'>*인증번호가 일치하기 않습니다.</p>}
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
