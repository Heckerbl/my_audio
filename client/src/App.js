import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from './Components/Nav';
import Context from './context';
import Homepage from './Pages/HomePage';
import "./Styles/Global.css"

<<<<<<< HEAD
import Context from "./Context"

const App = () => {
  return (<>
<Context>     <Router>
=======
const App = () => {
  return (<>

    <Context>
      <Router>
>>>>>>> 7f0092db7330d419a91dfab389181a53dddee5a4
        <Nav></Nav>
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
<<<<<<< HEAD
      </Router> 
      </Context>
 
=======
      </Router>
    </Context>

>>>>>>> 7f0092db7330d419a91dfab389181a53dddee5a4
  </>);
};

export default App;


