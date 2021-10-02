import { useState } from "react";
import MsgListDropDown from "./MsgListDropDown";

import "./Messenger.scss";

const Messenger = ({ avatar, nickname, messages, userInfo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  //문제는 각각의 Messenger들은 개별적인 컴포넌트이긴 하지만,
  //현재 Messenger컴포넌트가 열려있는 상황(메신저 탭이 선택된 상황)에서 상태값이 변경되게 되면,
  //모든 Messenger컴포넌트에서 모달이 열려버리게 된다.
  const modalHandler = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <>
      <div className="messagelist" onClick={modalHandler}>
        <div className="userInfo__container">
          <div className="m__avatar__container">
            <img
              className="m__avatar"
              src={
                avatar !== ""
                  ? avatar
                  : require("../../../images/dummy/white.jpeg").default
              }
              alt="m_avatar"
            />
          </div>
        </div>
        <div className="latest__message__container">
          <div className="m__name">
            <p>{nickname}</p>
          </div>
          <div className="latest__message__content">
            {/* {msg[msg.length - 1].content} */}
          </div>
        </div>
      </div>
      {modalOpen && (
        <MsgListDropDown
          userInfo={userInfo}
          nickname={nickname}
          messages={messages}
        />
      )}
    </>
  );
};

export default Messenger;
