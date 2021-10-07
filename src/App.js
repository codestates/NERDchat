import "./App.css";
import HomePage from "./pages/HomePage/Homepage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage/ChatPage";
import ServerPage from "./pages/serverpage/ServerPage";
import ServerRoomPage from "./pages/ServerRoomPage/ServerRoomPage";
import Mypage from "./pages/MyPage/MyPage";
import Callback from "./components/callback/Callback";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/servers" component={ServerPage} />
        <Route exact path="/gameId=:gameId" component={ServerRoomPage} />
        <Route
          path="/gameId=:gameId/roomId=:roomId/chatId=:chatId"
          component={ChatPage}
        />
        <Route exact path="/mypage" component={Mypage} />
        <Route path="/callback" component={Callback} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
