import "./ServerRoomPage.scss";
import ServerRoom from "../../components/ServerRoom/ServerRoom";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../UI/SideBar/SideBar";
import ServerRoomHeader from "../../components/ServerRoom/ServerRoomHeader/ServerRoomHeader";
const ServerRoomPage = () => {
  return (
    <>
      <NavBar />
      <div className="server__room__big__container">
        <div className="server__room__container">
          <div className="room__content">
            <ServerRoom />
          </div>
          <div className="side__bar__container">
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerRoomPage;

// {
//   /* <div className="server__container">
//   <div className="server__nav">
//     <NavBar />
//   </div>
//   <div className="server__main">
//     <div className="server__main-container">
//       <div className="server__main-header"></div>
//       <div className="server__main-content">
//         <div className="server__chat">
//           <ServerRoom />
//         </div>
//       </div>
//     </div>
//     <div className="private__sidebar">
//       <SideBar />
//     </div>
//   </div>
// </div>; */
// }
