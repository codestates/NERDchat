import React, { useState } from "react";
import { IoEllipseSharp } from "react-icons/io5";
import { Cookies } from "react-cookie";

import "./DMMessage.scss";

const DMMessage = ({ content }) => {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();
  const [currentTime] = useState(time);

  // return mine ? (
  //   <>
  //     <div className="current__container">
  //       <div className="current__time">{currentTime}</div>
  //       <div className="current__name">
  //         {user}
  //         <IoEllipseSharp size={8} className="onlines" />
  //       </div>
  //     </div>
  //     <div className="current__body-container">
  //       <div className="current__body">{body}</div>
  //     </div>
  //   </>
  // ) : (
  //   <>
  //     <div className="user__container">
  //       <div className="user__name">
  //         <IoEllipseSharp size={8} className="onliness" />
  //         {user}
  //       </div>
  //       <span className="user__time">{currentTime}</span>
  //     </div>
  //     <div className="user__body-container">
  //       <div className="user__body">{body}</div>
  //     </div>
  //   </>
  // );
  return <div>aptlwl..</div>;
};

export default DMMessage;
