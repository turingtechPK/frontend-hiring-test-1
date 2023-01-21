import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import CallsContext, { CallsProvider } from './context/CallsContext'
import { BrowserRouter as Router,Route, Routes } from "react-router-dom"
import CallsList from './pages/CallsList';

function App() {
  return (
    <div>
      <CallsProvider>
      <Router>
        <Routes>
        <Route exact
              path='/'
              element={
                <>
                    <Header />
                    <Login />
                </>
              }
            />
            <Route path='/callspage' element={<CallsList/>} />
        </Routes>
       </Router>
       </CallsProvider>
    </div>
  );
}

export default App;
