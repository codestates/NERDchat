import React from "react";
import { IoIosPaperPlane } from "react-icons/io";
import "./PInput.scss";

function PInput({ msgInputHandler, newMsg, sendHandler, setNewMsg }) {
  return (
    <form className="pinput_form">
      <input
        className="pinput_input"
        type="text"
        placeholder="Type a message.."
        value={newMsg}
        onChange={msgInputHandler}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendHandler(event) : null
        }
      />
      <button className="pinput_sendButton" onClick={sendHandler}>
        <IoIosPaperPlane size={25} />
      </button>
    </form>
  );
}

export default PInput;
