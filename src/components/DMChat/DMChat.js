import { useRef, useEffect, useState } from "react";
import Message from "../../components/Chat/Message/Message";
import useSocket from "../../hooks/useSocket";
import Input from "../../components/Chat/Input/Input";
import { Cookies } from "react-cookie";

const DMChat = ({ to }) => {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const messages = [{ body: "hi", user: "mark", mine: false }];
  const messageEl = useRef(null);
  const [newMsg, setNewMsg] = useState("");
  const { privateMessage, joinRoom, users } = useSocket(
    null,
    to,
    userInfo,
    "",
    ""
  );
  console.log(123123123, users);
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  useEffect(() => {
    // joinRoom();
  }, []);
  const msgInputHandler = (e) => {
    setNewMsg(e.target.value);
    e.preventDefault();
  };
  const sendHandler = (e) => {
    privateMessage(newMsg, to);
    e.preventDefault();
    setNewMsg("");
  };
  return (
    <div className="chatApp">
      <div className="chatApp__chat">
        <div className="chatApp__head"></div>
        <div className="chatApp__messages" ref={messageEl}>
          {messages.map((m, i) => (
            <div key={i} className={`chatApp__msg`}>
              <Message message={m} />
            </div>
          ))}
        </div>
        {/* <div ref={audioList}>
              <audio ref={audioRef}>mute</audio>
            </div> */}
        <div className="chatApp__footer">
          <Input
            msgInputHandler={msgInputHandler}
            newMsg={newMsg}
            sendHandler={sendHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default DMChat;
