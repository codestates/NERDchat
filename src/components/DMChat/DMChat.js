import { useRef, useEffect, useState } from "react";
import Message from "../../components/Chat/Message/Message";
import useDM from "../../hooks/useDM";
import Input from "../../components/Chat/Input/Input";
import { Cookies } from "react-cookie";

const DMChat = ({ to }) => {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  // const inputRef = useRef();
  const messageEl = useRef(null);
  const [newMsg, setNewMsg] = useState("");
  const { privateMessageHandler, userList, userListRef } = useDM(to, userInfo);
  // const messageList = users.filter((user) => user.userId === userInfo.userId);
  // const myMsgList = userList.filter((el) => el.userId === userInfo.userId);
  // console.log(77777, messageList);

  // console.log(1004, privateMessageHandler);
  // console.log(1006, userList, userListRef);
  // const messageList = userListRef.current.filter(
  //   (user) => user.userId === userInfo.userId
  // );
  console.log(7777, userListRef.current);
  // const messageList = users[0].messages.map((el) => {
  //   return {
  //     body: el.content,
  //     user: el.from,
  //     mine: el.userId === userInfo.userId,
  //   };
  // });

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  const msgInputHandler = (e) => {
    e.preventDefault();
    setNewMsg(e.target.value);
  };
  const sendHandler = (e) => {
    e.preventDefault();
    console.log("This is to", to);
    privateMessageHandler(newMsg, to);
    setNewMsg("");
  };
  return (
    <div className="chatApp">
      <div className="chatApp__chat">
        <div className="chatApp__head"></div>
        <div className="chatApp__messages" ref={messageEl}>
          {/* {messageList.map((m, i) => (
            <div key={i} className={`chatApp__msg`}>
              <Message message={m} />
            </div>
          ))} */}
        </div>
        <div className="chatApp__footer">
          {/* <form onSubmit={sendHandler}>
            <input ref={inputRef} />
            <button type="submit">click</button>
          </form> */}
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
