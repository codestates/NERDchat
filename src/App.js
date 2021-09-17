import './App.css';
import HomePage from './pages/HomePage/Homepage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage/ChatPage';
import ServerPage from './pages/serverpage/ServerPage';
import Login from './components/login/Login';
import ServerRoom from './pages/ServerRoomPage/ServerRoom';

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/servers'>
          <ServerPage />
        </Route>
        <Route path='/game/:gameId'>
          <ServerRoom />
        </Route>
        <Route path='/chat'>
          <ChatPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
