import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from './Components/Nav';
import Context from './context';
import Homepage from './Pages/HomePage';
import "./Styles/Global.css"

const App = () => {
  return (<>

    <Context>
      <Router>
        <Nav></Nav>
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </Router>
    </Context>

  </>);
};

export default App;


