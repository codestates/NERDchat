import { useContext } from "react";
import Modal from "../../UI/modal/Modal";
import axios from "axios";
import { Context } from "../../context/ContextProvider";
import "./UserDelete.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const UserDelete = ({ nickname }) => {
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
      <div className="delete__container">
        <div className="delete__title">Do you want to unfriend this user?</div>
      </div>
      <div>
        <div className="delete__container-btn">
          <button className="delete__btn-yes" onClick={okHandler}>
            OK
          </button>
          <button className="delete__btn-no" onClick={noHandler}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserDelete;
