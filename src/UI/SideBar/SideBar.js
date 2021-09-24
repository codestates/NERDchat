import React, { useState, useContext } from "react";
import FriendList from "../../components/SideTap/FriendList/FriendList";
import Messenger from "../../components/SideTap/Messenger/Messenger";
import OnlineUser from "../../components/SideTap/OnlineUser/OnlineUser";
import { IoBatteryFull } from "react-icons/io5";

import { Context } from "../../context/ContextProvider";

import "./SideBar.scss";

const SideBar = () => {
  const [toggleState, setToggleState] = useState(1);

  const { friends } = useContext(Context);
  console.log(friends);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="sidebar-container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          FRIEND
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          ONLINE
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          MESSAGE
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <IoBatteryFull size={30} className="content-BatteryFull" />
          {friends.map((el) => (
            <FriendList key={el.id} avatar={el.avatar} nickname={el.nickname} />
          ))}
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <IoBatteryFull size={30} className="content-BatteryFull" />
          <OnlineUser />
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <FriendList />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
