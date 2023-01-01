import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import CallList from "./Components/CallList/CallList";

const App = () => (
  <>
    {/* <Login /> */}
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/calls" element={<CallList />} />
      </Routes>
    </Router>
  </>
  // <div className="App">
  // </div>
);

export default App;
