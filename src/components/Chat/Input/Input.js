import React from "react";
import { IoIosPaperPlane } from "react-icons/io";
import "./Input.scss";

function Input({ msgInputHandler, newMsg, sendHandler }) {
  return (
    <form className="input_form">
      <input
        className="input_input"
        type="text"
        placeholder="Type a message!"
        value={newMsg}
        onChange={msgInputHandler}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendHandler(event) : null
        }
      />
      <button className="input_sendButton" onClick={sendHandler}>
        <IoIosPaperPlane size={25} />
      </button>
    </form>
  );
}

export default Input;
