import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from './Components/Nav';
import Homepage from './Pages/HomePage';
import "./Styles/Global.css"


import { ContextProvider } from './context';

const App = () => {
  return (<>
    {/* <ContextProvider> */}

      <Router>
        <Nav></Nav>
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </Router>
    {/* </ContextProvider> */}
  </>);
};

export default App;


