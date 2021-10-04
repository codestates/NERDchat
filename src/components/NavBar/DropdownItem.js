import React from "react";
import { IoAttachOutline } from "react-icons/io5";

import "./DropdownItem.scss";

const DropdownItem = ({ gameList }) => {
  return (
    <div>
      <div className="drop-menu-item">
        <div className="drop-icon-button">
          <IoAttachOutline size={20} className="icona" />
        </div>
        <span className="drop-game-list">{gameList}</span>
      </div>
    </div>
  );
};

export default DropdownItem;
