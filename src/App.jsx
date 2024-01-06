import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './pages/Login'
import Header from '@components/Header/Header'
import CallsList from '@pages/CallsList'
import { useEffect } from 'react'
import axiosInstance from './services/axiosService'
import { useAuth } from '@contexts/authContext'
function App() {
  const {refreshToken,userData} = useAuth()
  useEffect(() => {
    if(!userData.loggedIn){
      return
    }
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken")
      try {
        const response = await axiosInstance.post('/auth/refresh-token',null,{headers:{
          Authorization:`Bearer ${token}`
        }});
        console.log(response.data);
        refreshToken(response.data)
      } catch (error) {
        console.log(error.message);
      }
    };
      const intervalId = setInterval(fetchData, 9 * 60 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
    <div className='main-layout'>
    <Header/>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/call-list" element={<CallsList/>}/>
      </Routes>
    </Router>
    </div>
    </>
  )
}

export default App
