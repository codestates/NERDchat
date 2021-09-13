import React from 'react';
import './LoginTab.scss';

const LoginTab = ({ isLoginClicked, loginTablHandler }) => {
  return (
    <>
      <div className='modal__tab__container'>
        <div className='tab__header'>
          {isLoginClicked && <h3>NerdChat에 로그인</h3>}
          {!isLoginClicked && <h3>NerdChat에 가입하세요</h3>}
        </div>
        <div className='modal__tab'>
          <div
            className={
                    isLoginClicked
                      ? 'modal__tab__options clicked__tab'
                      : 'modal__tab__options'
                }
            onClick={() => loginTablHandler(1)}
          >
            로그인
          </div>
          <div
            className={
                    isLoginClicked
                      ? 'modal__tab__options'
                      : 'modal__tab__options clicked__tab'
                }
            onClick={() => loginTablHandler(0)}
          >
            회원가입
          </div>
        </div>
        <div className='modal__tab__split' />
      </div>
    </>
  );
};

export default LoginTab;
