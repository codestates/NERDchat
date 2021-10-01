import { useContext } from "react";
import Modal from "../../UI/modal/Modal";
import axios from "axios";
import { Context } from "../../context/ContextProvider";
import "./UserAdd.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const UserAdd = ({ nickname }) => {
  const { addFriendModalHandler } = useContext(Context);

  //친구초대 승낙
  const okHandler = async () => {
    //nickname을 어떻게 받아올지가 문제, 아마 친구리스트에서 클릭할때 props로 내려주면 될듯?
    const res = await axios.post(
      `${ENDPOINT}friends/accept/${nickname}`,
      { accept: true },
      {
        withCredentials: true,
      }
    );
    console.log(res);
    addFriendModalHandler();
  };

  //친구초대 거절
  const noHandler = async () => {
    const res = await axios.post(
      `${ENDPOINT}friends/accept/${nickname}`,
      { accept: false },
      {
        withCredentials: true,
      }
    );
    addFriendModalHandler();
  };

  return (
    <Modal>
      <div className="adduser_container">
        <div className="adduser_title">Add User to Friend List?</div>
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
