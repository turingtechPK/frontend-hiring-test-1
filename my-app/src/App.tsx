import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Auth from "./components/Authentication/auth";
import Navbar from "./components/NavBar/navBar";
import "./App.css";
import CallTable from "./components/CallTable/callTable";

function App() {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/calls" /> : <Auth />} />
        <Route path="/calls" element={token ? <CallTable /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
