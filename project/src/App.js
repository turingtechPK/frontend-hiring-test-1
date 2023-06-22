import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Header from "./components/Navigation/Header";
import CallList from "./components/CallList/CallList";
import Login from "./components/User/Login";

import "./App.css";

function App() {
  
  const token = JSON.parse(sessionStorage.getItem('accessToken'));

  if (token) {
    <Login />
  }
  
  return (
    <React.Fragment>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact></Route>
          <Route path="/callList" element={<CallList />} exact></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
