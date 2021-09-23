import { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { Cookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "../../UI/modal/Modal";
import "./Logout.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const Logout = () => {
  const cookies = new Cookies();
  const history = useHistory();
  const { logoutModalOpen, logoutModalHandler } = useContext(Context);
  const yesHandler = async () => {
    const res = await axios.get(`${ENDPOINT}/logout`, {
      withCredentials: true,
    });
    cookies.remove("userInfo");
    localStorage.removeItem("nerd-logged-in");
    history.push("/");
    logoutModalHandler();
  };
  const noHandler = () => {
    logoutModalHandler();
  };
  return (
    <Modal>
      <div>
        <div className="guide__msg">로그아웃 하시겠습니까?</div>
        <div className="logout__btn__container">
          <button onClick={yesHandler}>yes</button>
          <button onClick={noHandler}>no</button>
        </div>
      </div>
    </Modal>
  );
};

export default Logout;
