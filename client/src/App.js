import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import Home from './Pages/Home';
const App = () => {
  return (<>
    <BrowserRouter>
      <Switch>
        <Route path='/' Component={Home}></Route>
      </Switch>
    </BrowserRouter>
  </>);
};

export default App;


