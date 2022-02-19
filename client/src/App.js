import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav";
import Homepage from "./Pages/HomePage";
import "./Styles/Global.css";
import Playlist from "./Pages/Playlist";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AudioController from "./Components/AudioController";
import { ContexStore } from "./context.js";
import Cookies from "js-cookie";


const App = () => {
  const details = useContext(ContexStore);
  const [playMusic] = details.musicStatus;
  const cookie = Cookies.get("userCookie");

  return (
    <>
      {
        playMusic && <AudioController />
      }
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
