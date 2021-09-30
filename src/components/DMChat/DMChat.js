// import { useRef, useEffect, useState } from "react";
// import DMMessage from "./DMMessage/DMMessage";
// import useDM from "../../hooks/useDM";
// import Input from "../../components/Chat/Input/Input";
// import { Cookies } from "react-cookie";

// const DMChat = ({ to }) => {
//   const cookies = new Cookies();
//   const userInfo = cookies.get("userInfo");

//   const messageEl = useRef(null);
//   const [newMsg, setNewMsg] = useState("");
//   const { privateMessage, userDM } = useDM(userInfo, to);

//   useEffect(() => {
//     if (messageEl) {
//       messageEl.current.addEventListener("DOMNodeInserted", (event) => {
//         const { currentTarget: target } = event;
//         target.scroll({ top: target.scrollHeight, behavior: "smooth" });
//       });
//     }
//   }, []);
//   const msgInputHandler = (e) => {
//     e.preventDefault();
//     setNewMsg(e.target.value);
//   };
//   const sendHandler = (e) => {
//     e.preventDefault();
//     privateMessage(newMsg, to);
//     setNewMsg("");
//   };
//   return (
//     <div className="chatApp">
//       <div className="chatApp__chat">
//         <div className="chatApp__head"></div>
//         <div className="chatApp__messages" ref={messageEl}>
//           {userDM.map((content, idx) => (
//             <div key={idx} className={`chatApp__msg`}>
//               <DMMessage content={content} />
//             </div>
//           ))}
//         </div>
//         <div className="chatApp__footer">
//           {/* <form onSubmit={sendHandler}>
//             <input ref={inputRef} />
//             <button type="submit">click</button>
//           </form> */}
//           <Input
//             msgInputHandler={msgInputHandler}
//             newMsg={newMsg}
//             sendHandler={sendHandler}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DMChat;
