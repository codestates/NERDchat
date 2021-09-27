import "./App.css";
import HomePage from "./pages/HomePage/Homepage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage/ChatPage";
import ServerPage from "./pages/serverpage/ServerPage";
import ServerRoomPage from "./pages/ServerRoomPage/ServerRoomPage";
import Mypage from "./pages/MyPage/MyPage";
import PrivateChatPage from "./pages/PrivateChatPage/PrivateChatPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/servers">
          <ServerPage />
        </Route>
        <Route exact path="/gameId=:gameId">
          <ServerRoomPage />
        </Route>
        <Route path="/gameId=:gameId/roomId=:roomId/chatId=:chatId">
          <ChatPage />
        </Route>
        <Route exact path="/mypage">
          <Mypage />
        </Route>
        <Route exact path="/private">
          <PrivateChatPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
