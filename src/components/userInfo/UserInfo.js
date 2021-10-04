import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "../../UI/modal/Modal";
import { Context } from "../../context/ContextProvider";
import "./UserInfo.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const UserInfo = ({ nickname }) => {
  const { userInfoModalHandler } = useContext(Context);
  const [friendInfo, setFriendInfo] = useState({});
  const closeHandler = () => {
    userInfoModalHandler();
  };
  const getUserProfileHandler = async () => {
    const res = await axios.get(`${ENDPOINT}/profile/${nickname}`);
    setFriendInfo(res.data.data);
  };
  useEffect(() => {
    getUserProfileHandler();
  }, []);

  return (
    <Modal>
      <div className="avatar__container">
        <div className="avatar__container-img">
          <img
            className="avatar__container-img-cur"
            src={
              friendInfo.avatar !== null
                ? friendInfo.avatar
                : require("../../images/dummy/white.jpeg").default
            }
            alt=""
          />
        </div>
        <div className="userInfo__container">
          <span className="userInfo__nic">
            <span className="userInfo__nic-title">Nickname</span>{" "}
            {friendInfo.nickname}
          </span>
          <span className="userInfo__status">
            <span className="userInfo__nic-title">Status</span>{" "}
            {friendInfo.status}
          </span>
          <span className="userInfo__email">
            <span className="userInfo__nic-title">E-mail</span>{" "}
            {friendInfo.email}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default UserInfo;
