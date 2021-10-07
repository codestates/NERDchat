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
  const { logoutModalHandler } = useContext(Context);
  const yesHandler = async () => {
    await axios.get(`${ENDPOINT}/logout`, {
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
        <div className="guide__msg">
          Log out of
          <p className="nerdchat">NERDchat</p>
        </div>
        <div className="logout__btn__container">
          <button className="logout__btn" onClick={yesHandler}>
            YES
          </button>
          <button className="logout__btn" onClick={noHandler}>
            NO
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Logout;
