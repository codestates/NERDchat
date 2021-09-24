import { useContext } from "react";
import Modal from "../../UI/modal/Modal";
import axios from "axios";
import Context from "../../context/ContextProvider";
import "./UserDelete.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const UserDelete = () => {
  const { deleteFriendModalHandler } = useContext(Context);

  const okHandler = async () => {
    //nickname을 어떻게 받아올지가 문제, 아마 친구리스트에서 클릭할때 props로 내려주면 될듯?
    const res = await axios.delete(`${ENDPOINT}/friends/delete/${nickname}`, {
      withCredentials: true,
    });
    console.log(res);
    deleteFriendModalHandler();
  };
  const noHandler = () => {
    deleteFriendModalHandler();
  };
  return (
    <Modal>
      <div>
        <div>Do you want to unfriend this user?</div>
      </div>
      <div>
        <button onClick={okHandler}>OK</button>
        <button onClick={noHandler}>Cancel</button>
      </div>
    </Modal>
  );
};

export default UserDelete;
