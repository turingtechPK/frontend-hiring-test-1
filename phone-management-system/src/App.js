import PhoneListing from "modules/phone-management/pages/PhoneListing";
import { Routes, Route } from "react-router-dom";
import {AuthInit} from "modules/auth/AuthInit";
import { Navbar } from "./components/Navbar/Navbar";
import Login from "modules/auth/pages/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AuthInit>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/calls" element={<PhoneListing />} />
        </Routes>
      </AuthInit>
    </div>
  );
}

export default App;
