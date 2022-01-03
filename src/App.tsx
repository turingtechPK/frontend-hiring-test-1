import Login from "./containers/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calls from "./containers/Calls";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="Login" element={<Login />}></Route>
          <Route path="Calls" element={<Calls />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
