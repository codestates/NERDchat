import "./ServerRoomPage.scss";
import ServerRoom from "../../components/ServerRoom/ServerRoom";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../UI/SideBar/SideBar";
const ServerRoomPage = () => {
  return (
    <>
      <NavBar />
      <div class="server__room__big__container">
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
