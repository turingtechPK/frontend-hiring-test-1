import './App.css';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import api from './services/dataService';

function App() {
  let accessToken = localStorage.AccesToken;
  if (accessToken) {
    api.defaults.headers.common = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div className='body'>
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
