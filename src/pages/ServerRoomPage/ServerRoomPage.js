import "./ServerRoomPage.scss";
import ServerRoom from "../../components/ServerRoom/ServerRoom";
import NavBar from "../../components/NavBar/NavBar";
const ServerRoomPage = () => {
  return (
    <>
      <NavBar />
      <div className="server__room__container">
        <div className="room__content">
          <ServerRoom />
        </div>
      </div>
    </>
  );
};

export default ServerRoomPage;
