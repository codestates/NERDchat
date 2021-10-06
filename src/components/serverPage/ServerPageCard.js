import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { BsChevronDoubleDown } from "react-icons/bs";
import Login from "../login/Login";
import Bookmark from "../../UI/bookmark/Bookmark";
import { Context } from "../../context/ContextProvider";
import "./ServerPageCard.scss";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const ServerPageCard = ({ category, img, id, like }) => {
  const history = useHistory();
  const { loginModalOpen, loginmodalHandler } = useContext(Context);
  const [clicked, setClicked] = useState(false);
  const addBookmarkHandler = async (e) => {
    // e.preventDefault();
    e.stopPropagation();
    if (!localStorage.getItem("nerd-logged-in")) {
      loginmodalHandler();
      return;
    }
    const res = await axios.get(`${ENDPOINT}/favorites/request/${id}`, {
      withCredentials: true,
    });
    if (!res.data.data) console.log(res);
    if (res.data.data) setClicked((prev) => !prev);
  };
  const getIntoServer = () => {
    const path = `/gameId=${id}`;
    history.push(path);
  };
  useEffect(() => {
    if (like) setClicked(true);
    else setClicked(false);
  }, []);
  return (
    <>
      <div
        className="grid__items"
        style={{ textDecoration: "none" }}
        onClick={getIntoServer}
      >
        <img className="game__image" src={`${img}`} />
        <div className="game__title__container">
          <div className="title__container">
            <p className="game__title">{category}</p>
          </div>
          <div className="game__server__content__container">
            <p className="game__server__content">INTO SERVER</p>
            <div className="server__arrow">
              <BsChevronDoubleDown size={20} />
            </div>
          </div>
        </div>
        <div className="bookmark__container" onClick={addBookmarkHandler}>
          {clicked ? (
            <IoBookmarkOutline size={20} className="bookclicked" />
          ) : (
            <Bookmark />
          )}
        </div>
      </div>
    </>
  );
};

export default ServerPageCard;
