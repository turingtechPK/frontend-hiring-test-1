import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Login from './components/Login';
import CallList from './components/CallList';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <Router>
      <Nav />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/calls" exact element={<CallList />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
