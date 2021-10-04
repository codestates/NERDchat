import { useContext } from "react";
import Modal from "../../UI/modal/Modal";
import axios from "axios";
import socket from "../../hooks/socket";
import { Context } from "../../context/ContextProvider";
import "./UserAdd.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const UserAdd = ({ nickname, userInfo, setMsg }) => {
  const { addFriendModalHandler, privateModalHandler } = useContext(Context);

  //친구초대 하기
  const okHandler = async () => {
    addFriendModalHandler();
    const res = await axios.get(`${ENDPOINT}/friends/send/${nickname}`, {
      withCredentials: true,
    });
    //요청이 잘 보내짐.
    //메시지 모달창을 열고, 친구초대 메시지를 보내자.
    //모달창 열 필요는 없을듯
    socket.emit("private message", {
      content: `${userInfo.userId} 님의 친구 초대를 승낙하시겠습니까?`,
      to: nickname,
      invite: -1,
      friend: 1,
    });

    //본인의 메시지창에서도 보이도록, but without button
    const incomingM = {
      content: `${userInfo.userId}님의 친구초대를 승락하시겠습니까?`,
      to: nickname,
      from: userInfo.userId,
      invite: -1,
      friend: -1,
    };
    //보내는사람 본인: userInfo.nickname;
    //받을 사람: nickname
    setMsg((prev) => {
      const temp = { ...prev.data };
      if (!temp[userInfo.nickname]) {
        temp[userInfo.nickname] = [incomingM];
        if (!temp[nickname]) {
          temp[nickname] = [incomingM];
        } else {
          temp[nickname].push(incomingM);
        }
        return { data: temp };
      } else {
        if (!temp[nickname]) {
          temp[nickname] = [incomingM];
        } else {
          temp[nickname].push(incomingM);
        }
        temp[userInfo.nickname].push(incomingM);

        return { data: temp };
      }
    });
    //확인 할 수 있도록 모달창 열어주기?
    privateModalHandler();
  };

  //취소
  const noHandler = async () => {
    addFriendModalHandler();
  };

  return (
    <Modal>
      <div className="adduser_container">
        <div className="adduser_title">Do you want to add friends?</div>
      </div>
      <div>
        <div className="adduser_container-btn">
          <button className="adduser_btn-yes" onClick={okHandler}>
            OK
          </button>
          <button className="adduser_btn-no" onClick={noHandler}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserAdd;
