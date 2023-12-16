import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CallList from "./components/CallList/CallList.tsx";
import Login from "./components/Login/Login.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import CallDetails from "./components/CallDetails/CallDetails.tsx";
import Pusher from "pusher-js";
import { APP_KEY, APP_CLUSTER } from "./services/pusherConfig.ts";

const pusher = new Pusher(APP_KEY, {
  cluster: APP_CLUSTER,
});
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index path="/" Component={Login} />
        <Route path="/call-list" Component={CallList} />
      </Routes>
    </Router>
  );
}

export default App;
