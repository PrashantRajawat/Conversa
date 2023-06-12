import "./App.css";
import { Route } from "react-router-dom";
import Home from "./Pages/home";
import Chats from "./Pages/chats";
import Login from "./Pages/login";
function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Login}></Route>
      <Route path="/chats" exact component={Chats}></Route>
      {/* <Route path="/login" exact component={Login}></Route> */}
    </div>
  );
}

export default App;
