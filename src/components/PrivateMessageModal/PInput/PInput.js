import React, { useState } from "react";
import { IoIosPaperPlane } from "react-icons/io";
import "./PInput.scss";

function PInput({ sendHandler }) {
  const [newMsg, setNewMsg] = useState("");
  //메시지입력핸들러
  const msgInputHandler = (e) => {
    e.preventDefault();
    setNewMsg(e.target.value);
  };

  const enterHandler = (e) => {
    sendHandler(e);
    setNewMsg("");
  };

  return (
    <form className="pinput_form">
      <input
        className="pinput_input"
        type="text"
        placeholder="Type a message.."
        value={newMsg}
        onChange={msgInputHandler}
        onKeyPress={(event) =>
          event.key === "Enter" ? enterHandler(event) : null
        }
      />
      <button className="pinput_sendButton" onClick={enterHandler}>
        <IoIosPaperPlane size={25} />
      </button>
    </form>
  );
}

export default PInput;
