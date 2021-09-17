import './App.css';
import HomePage from './pages/HomePage/Homepage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage/ChatPage';
import ServerPage from './pages/serverpage/ServerPage';
import Login from './components/login/Login';
import ServerRoomPage from './pages/ServerRoomPage/ServerRoomPage';

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
        <Route exact path='/:gameId'>
          <ServerRoomPage />
        </Route>
        <Route path='/:gameId/:path'>
          <ChatPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
