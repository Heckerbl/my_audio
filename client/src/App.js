import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Pages/HomePage';
import "./Styles/Global.css"
const App = () => {
  return (<>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  </>);
};

export default App;


