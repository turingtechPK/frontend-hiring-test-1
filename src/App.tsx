import SignIn from './components/SignIn';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calls from './components/CallsData';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<SignIn />}></Route>
          <Route path='Login' element={<SignIn />}></Route>
          <Route path='Calls' element={<Calls />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
