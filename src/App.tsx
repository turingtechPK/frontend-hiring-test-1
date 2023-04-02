import React from 'react';
import './App.css';
import TableViewPage from './pages/tableViewPage';
import SignInPage from './pages/signin';
// import {Router, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar';
import logo from './assets/TT Logo.png';
import MainViewContainer from './container/mainViewContainer';


function App() {

  return (
    // <TableViewPage/>
    <MainViewContainer/>
    // <SignInPage/>
    // <Router>
    //   <Switch>
    //     <Route exact path="/login" component={SignInPage} />
    //     <Route exact path="/" component={TableViewPage} />
    //   </Switch>
    // </Router>
  );
}

export default App;