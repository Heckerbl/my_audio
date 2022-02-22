// from react
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Nav from "./Components/Nav";
import Homepage from "./Pages/HomePage";
import Playlist from "./Pages/Playlist";
import AudioController from "./Components/AudioController";

// contex
import { ContexStore } from "./context.js";

// style
import "./Styles/Global.css";
import "react-toastify/dist/ReactToastify.css";

// additional packages
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const App = () => {
  const details = useContext(ContexStore);
  const [playMusic] = details.musicStatus;
  const cookie = Cookies.get("userCookie");

  return (
    <>
      {playMusic && <AudioController />}
      <Router>
        <Nav></Nav>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/playlist">
            <Playlist />
          </Route>
        </Switch>
      </Router>

      <ToastContainer autoClose={7000} />
    </>
  );
};

export default App;
