import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Dashboard from './pages/dashboard';


function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      
    </div>
  );
}

export default App;
