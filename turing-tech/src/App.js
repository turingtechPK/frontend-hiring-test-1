import './App.css';
import logo from'./TT Logo.png';
import Calls from './components/Calls';
import Form from './components/Form';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      {/* <nav className="navbar"><img src={logo} className="navbar-brand"></img></nav> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route path="/calls" element={<Calls />} />
        </Routes>
    </Router>
    </>
    
  );
}

export default App;
