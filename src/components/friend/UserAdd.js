import { useContext } from "react";
import Modal from "../../UI/modal/Modal";
import axios from "axios";
import socket from "../../hooks/socket";
import { Context } from "../../context/ContextProvider";
import "./UserAdd.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const UserAdd = ({ nickname, userInfo }) => {
  const { addFriendModalHandler, privateModalHandler } = useContext(Context);

  //친구초대 하기
  const okHandler = async () => {
    addFriendModalHandler();
    //nickname을 어떻게 받아올지가 문제, 아마 친구리스트에서 클릭할때 props로 내려주면 될듯?
    const res = await axios.get(`${ENDPOINT}/friends/send/${nickname}`, {
      withCredentials: true,
    });
    //요청이 잘 보내짐.
    //메시지 모달창을 열고, 친구초대 메시지를 보내자. 형제 컴포넌트라 새로운 메시지 상태관리 불가...
    //모달창 열 필요는 없을듯
    socket.emit("private message", {
      content: `${userInfo.userId}님의 친구초대를 승락하시겠습니까?`,
      to: nickname,
      invite: -1,
      friend: 1,
    });
    //새로고침 하고 열면 제대로 메시지 있찌 않을까?
    // window.location.reload();
    // privateModalHandler();
  };

  //취소
  const noHandler = async () => {
    // const res = await axios.post(
    //   `${ENDPOINT}friends/accept/${nickname}`,
    //   { accept: false },
    //   {
    //     withCredentials: true,
    //   }
    // );
    addFriendModalHandler();
  };

  return (
    <Modal>
      <div className="adduser_container">
        <div className="adduser_title">친구에 추가 하시겠습니까?</div>
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
