import { Route, Routes } from "react-router-dom";
import Calls from "../pages/Calls/index";
import Call from "../pages/Call/index";
import Login from "../pages/Login/index";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Calls />} />
      <Route path="/call/:id" element={<Call />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
