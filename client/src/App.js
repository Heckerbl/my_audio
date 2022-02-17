import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav";
import Context from "./context";
import Homepage from "./Pages/HomePage";
import "./Styles/Global.css";
import Playlist from "./Pages/Playlist";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AudioController from "./Components/AudioController";

const App = () => {
  return (
    <>

      <Context>
        <Router>
          <Nav></Nav>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/playlist">
              <Playlist />
              <AudioController />
            </Route>
          </Switch>
        </Router>
      </Context>
      <ToastContainer autoClose={7000} />
    </>
  );
};

export default App;
