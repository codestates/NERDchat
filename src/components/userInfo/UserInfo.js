import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "../../UI/modal/Modal";
import Context from "../../context/ContextProvider";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const UserInfo = ({ nickname }) => {
  const { userInfoModalHandler } = useContext(Context);
  const [friendInfo, setFriendInfo] = useState({});
  const closeHandler = () => {
    userInfoModalHandler();
  };
  const getUserProfileHandler = async () => {
    const res = await axios.get(`${ENDPOINT}/profile/${nickname}`);
    console.log(res.data);
    setFriendInfo(res.data.data);
  };
  useEffect(() => {
    getUserProfileHandler();
  }, []);

  return (
    <Modal>
      <div>
        <div className="avatar__container">
          <span>{friendInfo.avatar}</span>
        </div>
        <div className="userInfo__container">
          <span>{friendInfo.nickname}NickName</span>
          <span>{friendInfo.status}</span>
          <span>{friendInfo.email}</span>
        </div>

        <button onClick={closeHandler}>Close</button>
      </div>
    </Modal>
  );
};

export default UserInfo;
