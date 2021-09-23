import React from "react";

import {
  IoBatteryFull,
  IoBatteryDead,
  IoChevronDown,
  IoFingerPrintOutline,
  IoMailOpenOutline,
  IoPaperPlaneOutline,
  IoCutOutline,
} from "react-icons/io5";

import "./DropDown.scss";

function DropDown() {
  return (
    <div className="friendlist__wrapper">
      <ul className="friendlist__menu">
        <li className="friendlist__li">
          <a href="#" className="friendlist__a">
            <div className="friendlist__icon">
              <IoFingerPrintOutline className="friendlist__icon_icon" />
            </div>
            Information
          </a>
        </li>
        <li className="friendlist__li">
          <a href="#">
            <div className="friendlist__icon">
              <IoMailOpenOutline />
            </div>
            Message
          </a>
        </li>
        <li className="friendlist__li">
          <a href="#">
            <div className="friendlist__icon">
              <IoPaperPlaneOutline />
            </div>
            Invite
          </a>
        </li>
        <li className="friendlist__li">
          <a href="#">
            <div className="friendlist__icon">
              <IoCutOutline />
            </div>
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DropDown;
