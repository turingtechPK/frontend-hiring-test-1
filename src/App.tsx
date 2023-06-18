import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Login } from './pages/login/login';
import { ListTechnologies } from './pages/list-technologies/list-technologies';

function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/home" element={<ListTechnologies />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
