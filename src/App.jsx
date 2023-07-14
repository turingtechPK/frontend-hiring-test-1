import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./userPages/Login";
import Home from "./userPages/Home";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigate to="/login" replace={true} />
              </>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
