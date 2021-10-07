import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./SignUp.scss";
import { Context } from "../../context/ContextProvider";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const CODE = process.env.REACT_APP_EMAIL_CODE;

const SignUp = () => {
  const { loginmodalHandler } = useContext(Context);
  const [enteredInfo, setEnteredInfo] = useState({
    id: "",
    idIsValid: true,
    nickname: "",
    nicknameIsValid: true,
    pw: "",
    pwIsValid: true,
    pwc: "",
    pwcIsValid: true,
    email: "",
    emailIsValid: true,
    verifyCode: "",
  });
  const [AVerifyCode, setAVerifyCode] = useState(CODE);
  const [emailIsVerified, setEmailIsVerified] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  // 인풋값 유효성검사
  const {
    id,
    idIsValid,
    nickname,
    nicknameIsValid,
    pw,
    pwIsValid,
    pwc,
    pwcIsValid,
    email,
    emailIsValid,
    verifyCode,
  } = enteredInfo;
  useEffect(() => {
    const verifier = setTimeout(() => {
      if (id.length !== 0) {
        if (id.trim().length >= 4 && id.trim().length <= 25) {
          setEnteredInfo((prev) => {
            return { ...prev, idIsValid: true };
          });
        } else {
          setEnteredInfo((prev) => {
            return { ...prev, idIsValid: false };
          });
        }
      }

      if (nickname.length !== 0) {
        if (nickname.trim().length >= 4 && nickname.trim().length <= 25) {
          setEnteredInfo((prev) => {
            return { ...prev, nicknameIsValid: true };
          });
        } else
          setEnteredInfo((prev) => {
            return { ...prev, nicknameIsValid: false };
          });
      }
      if (pw.length !== 0) {
        validatePasswordHandler(pw);
      }
      if (pwc.length !== 0) {
        if (pwc === pw) {
          setEnteredInfo((prev) => {
            return { ...prev, pwcIsValid: true };
          });
        } else
          setEnteredInfo((prev) => {
            return { ...prev, pwcIsValid: false };
          });
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
      if (
        idIsValid &&
        nicknameIsValid &&
        pwIsValid &&
        pwcIsValid &&
        emailIsValid &&
        emailIsVerified &&
        id.length !== 0 &&
        nickname.length !== 0 &&
        pw.length !== 0 &&
        email.length !== 0 &&
        pwc.length !== 0
      )
        setFormIsValid(true);
      else setFormIsValid(false);
    }, 500);
    return () => clearTimeout(verifyForm);
  }, [
    idIsValid,
    nicknameIsValid,
    pwIsValid,
    pwcIsValid,
    emailIsValid,
    emailIsVerified,
  ]);

  const validatePasswordHandler = (pw) => {
    const regPw = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    if (!regPw.test(pw))
      setEnteredInfo((prev) => {
        return { ...prev, pwIsValid: false };
      });
    else
      setEnteredInfo((prev) => {
        return { ...prev, pwIsValid: true };
      });
  };
  const validateEmailHandler = (em) => {
    const regEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!regEmail.test(em))
      setEnteredInfo((prev) => {
        return { ...prev, emailIsValid: false };
      });
    else
      setEnteredInfo((prev) => {
        return { ...prev, emailIsValid: true };
      });
  };
  const idHandler = (e) => {
    setEnteredInfo((prev) => {
      return { ...prev, id: e.target.value };
    });
  };
  const nicknameHandler = (e) => {
    setEnteredInfo((prev) => {
      return { ...prev, nickname: e.target.value };
    });
  };
  const pwHandler = (e) => {
    setEnteredInfo((prev) => {
      return { ...prev, pw: e.target.value };
    });
  };
  const pwcHandler = (e) => {
    setEnteredInfo((prev) => {
      return { ...prev, pwc: e.target.value };
    });
  };
  const emailHandler = (e) => {
    setEnteredInfo((prev) => {
      return { ...prev, email: e.target.value };
    });
  };

  // 이메일 인증 요청
  const sendEmailHandler = async () => {
    const res = await axios.post(`${ENDPOINT}/emailVerify`, { email });
    // const res.data.verifyToken
    // console.log(res.data.data.verifyToken);
    setAVerifyCode(res.data.data.verifyToken);
  };

  // 이메일 인증코드 입력
  const codeHandler = (e) => {
    setEnteredInfo((prev) => {
      return { ...prev, verifyCode: e.target.value };
    });
  };
  // 이메일 인증코드 확인
  const emailCodeHandler = (e) => {
    setConfirmClicked(true);
    if (+verifyCode === AVerifyCode) {
      console.log("working");
      setEmailIsVerified(true);
    } else setEmailIsVerified(false);
    // console.log(emailIsVerified);
  };
  // 회원가입 요청
  const signUpHandler = async (event) => {
    event.preventDefault();
    const headers = { "Content-Type": "application/json" };
    const res = await axios.put(
      `${ENDPOINT}/signup`,
      { id, password: pw, email, nickname },
      { headers: headers, withCredentials: true }
    );
    console.log(res.data);
    loginmodalHandler();
  };

  return (
    <>
      <form className="login__input__container" onSubmit={signUpHandler}>
        <div className="id__input__container">
          <input
            type="text"
            id="id"
            onChange={idHandler}
            required
            autocomplet="off"
            className="form-control"
            placeholder="ID"
          />
          <label htmlFor="id" className="form-label">
            ID
          </label>
          {!idIsValid && (
            <p className="errMsg">4 자에서 25 자 사이이어야 합니다.</p>
          )}
        </div>
        <div className="nickname__input__container">
          <input
            type="text"
            id="nickname"
            onChange={nicknameHandler}
            required
            autocomplet="off"
            className="form-control"
            placeholder="NICKNAME"
          />
          <label htmlFor="nickname" className="form-label">
            NICKNAME
          </label>
          {!nicknameIsValid && (
            <p className="errMsg">4 자에서 25 자 사이이어야 합니다.</p>
          )}
        </div>
        <div className="pw__input__container">
          <input
            type="password"
            id="pw"
            onChange={pwHandler}
            placeholder="password"
            autocomplet="off"
            className="form-control"
            placeholder="PASSWORD"
          />
          <label htmlFor="pw" className="form-label">
            PASSWORD
          </label>{" "}
          {!pwIsValid && (
            <p className="errMsg">영문, 숫자 혼합 6 자 이상이어야 합니다.</p>
          )}
        </div>
        <div className="pwc__input__container">
          <input
            type="password"
            id="pwc"
            onChange={pwcHandler}
            placeholder="password"
            autocomplet="off"
            className="form-control"
            placeholder="PASSWORD CONFIRM"
          />
          <label htmlFor="pwc" className="form-label">
            PASSWORD CONFIRM
          </label>{" "}
          {!pwcIsValid && (
            <p className="errMsg">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>
        <div className="email__input__container">
          <label htmlFor="email">E-mail</label>
          <div className="verify__email__container">
            <input type="text" id="email" onChange={emailHandler} />
            <button
              type="button"
              className={
                emailIsValid ? "verify__email__btn" : "verify__email__btn"
              }
              disabled={!emailIsValid}
              onClick={sendEmailHandler}
            >
              Send Code
            </button>
          </div>
          {!emailIsValid && (
            <p className="errMsg">유효한 이메일 주소를 입력해 주세요.</p>
          )}
        </div>
        <div className="verify__email__input__container">
          <label htmlFor="vemail">E-mail Verify</label>
          <div className="email__code__container">
            <input
              type="text"
              id="vemail"
              onChange={codeHandler}
              className="code__input"
            />
            <button
              type="button"
              className="email__code__btn"
              onClick={emailCodeHandler}
            >
              Check
            </button>
          </div>
          {!emailIsVerified && verifyCode.length !== 0 && confirmClicked && (
            <p className="errMsg">인증 번호가 일치하지 않습니다.</p>
          )}
          {emailIsVerified && confirmClicked && (
            <p className="codeConfirmMsg">인증이 완료 되었습니다.</p>
          )}
        </div>
        <div>
          <p className="contract">
            Considered to have agreed to a contract for collecting and using
            personal information.
            {/* 이용 약관에 동의한 것으로 간주됩니다. */}
          </p>
        </div>
        <button
          type="submit"
          className={formIsValid ? "signUpBtn" : "disabledBtn"}
          disabled={!formIsValid}
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
