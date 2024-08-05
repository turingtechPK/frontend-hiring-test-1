import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CallDetails from "./components/CallDetails";
import Login from "./components/Login";
import Dashboard from "./view/Dashboard";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              exact
              path="/"
              element={
                token ? (
                  <Dashboard token={token} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/call/:id"
              element={
                token ? <CallDetails token={token} /> : <Navigate to="/login" />
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
