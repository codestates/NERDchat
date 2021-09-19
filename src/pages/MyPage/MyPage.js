import React, { useContext } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../UI/SideBar/SideBar';
import { Context } from '../../context/ContextProvider';
import './MyPage.scss';

function MyPage () {
  const { userInfo } = useContext(Context);
  console.log(userInfo.nickname, userInfo.status, userInfo.email);
  return (
    <div className='mypage-container'>
      <div className='mypage-nav'>
        <NavBar />
      </div>
      <div className='mypage-main'>
        <div className='mypage-main-container'>
          <div className='mypage-main-content'>
            <div className='mypage-chat'>
              <div className='mypage-card'>
                <div className='mypage-photo'>
                  <img
                    src={require('../../images/dummy/white.jpeg').default}
                    alt=''
                  />
                </div>
                <div className='mypage-welcom'>WELCOM,</div>
                <div className='mypage-nickname'>
                  {/* {userInfo.nickname} */}
                  HORANG
                </div>
                <div className='mypage-status'>
                  {/* {userInfo.status}  */}
                  After the project, the game will be over.
                </div>
              </div>
              <div className='mypage-info'>
                <div className='mypage-infomation'>
                  <h2>INFORMATION</h2>
                </div>
                <div className='form'>
                  <input
                    type='text'
                    id='email'
                    className='form__input'
                    autocomplete='off'
                    placeholder=' '
                  />
<<<<<<< HEAD
                  <label for='email' className='form__label'>
=======
                  <label htmlFor='email' className='form__label'>
                    {/* { userInfo.email} */}
>>>>>>> 9cbb7c5f39823a023362143013a0d0040dcfd816
                    Email
                  </label>
                </div>
                <div className='form'>
                  <input
                    type='password'
                    id='password'
                    className='form__input'
                    autocomplete='off'
                    placeholder=' '
                  />
<<<<<<< HEAD
                  <label for='password' className='form__label'>
=======
                  <label htmlFor='password' className='form__label'>
>>>>>>> 9cbb7c5f39823a023362143013a0d0040dcfd816
                    password
                  </label>
                </div>
                <div className='form'>
                  <input
                    type='password'
                    id='passwordConfrim'
                    className='form__input'
                    autocomplete='off'
                    placeholder=' '
                  />
<<<<<<< HEAD
                  <label for='passwordConfrim' className='form__label'>
=======
                  <label htmlFor='passwordConfrim' className='form__label'>
>>>>>>> 9cbb7c5f39823a023362143013a0d0040dcfd816
                    Confrim Password
                  </label>
                </div>
                <button type='submit' className='mypage-button'>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='mypage-sidebar'>
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
