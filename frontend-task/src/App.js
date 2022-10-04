import './App.css';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  );
}

export default App;
