import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import "./font/AvenirLTStd-Black.otf"
import LoginPage from './pages/LoginPage/LoginPage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn ? <Main /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}

    </div>
  );
}

export default App;
