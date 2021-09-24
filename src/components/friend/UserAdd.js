import { useContext } from "react";
import Modal from "../../UI/modal/Modal";
import axios from "axios";
import Context from "../../context/ContextProvider";
import "./UserAdd.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const UserAdd = () => {
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
      <div>
        <div>Add User to Friend List?</div>
      </div>
      <div>
        <button onClick={okHandler}>OK</button>
        <button onClick={noHandler}>Cancel</button>
      </div>
    </Modal>
  );
};

export default UserAdd;
