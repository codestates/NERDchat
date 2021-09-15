import "./App.css";
import HomePage from "./pages/HomePage/Homepage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ServerPage from "./pages/serverpage/ServerPage";
import Login from "./components/login/Login";

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
