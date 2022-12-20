import React from "react";
import SignIn from "./components/signIn";
import { Routes, Route } from "react-router-dom";
import CallList from "./components/callList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/list" element={<CallList />} />
    </Routes>
  );
}

export default App;
