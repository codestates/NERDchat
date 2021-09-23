import React from "react";

import "./Input.scss";

function Input({ message, setMessage, sendMessage }) {
  return (
    <form className="input_form">
      <input
        className="input_input"
        type="text"
        placeholder="Type a message.."
        value={message}
        // onChange={(event) => setMessage(event.target.value)}
        // onKeyPress={(event) =>
        //   event.key === "Enter" ? sendMessage(event) : null
        // }
      />
      <button
        className="input_sendButton"
        // onClick={(event) => sendMessage(event)}
      >
        Send
      </button>
    </form>
  );
}

export default Input;
