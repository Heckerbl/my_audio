import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from './Components/Nav';
import Homepage from './Pages/HomePage';
import "./Styles/Global.css"

import Context from "./Context"

const App = () => {
  return (<>
<Context>     <Router>
        <Nav></Nav>
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </Router> 
      </Context>
 
  </>);
};

export default App;


