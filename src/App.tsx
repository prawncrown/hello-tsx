import React from 'react';
import BottomTabs from './BottomTabs';
import Home from './Home'
import Users from './Users'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import About from './About';



class App extends React.Component{
  render() {
    return (
      <Router >
          <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/neaby">
            <Users />
          </Route>
          <Route exact path="/fav">
            <About />
          </Route>
          </Switch>
        <BottomTabs/>
    </Router>
    );
  }
}
export default App

