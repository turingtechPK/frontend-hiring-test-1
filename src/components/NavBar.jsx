import React from 'react'
import { useContext } from 'react'
import TTLogo from '../images/TTLogo.png'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

const NavBar = () => {
    const {token , clearAuthData} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        clearAuthData();
        navigate("/login");
        };

  return (
    
      
       <div className="nav-bar  py-4 px-6 border shadow-sm   " style={{display: 'flex', alignItems:'center',justifyContent:'space-between'}} >
        <img src={TTLogo} alt="Turing Logo" className="  h-8 " />
        <Button variant="contained" onClick={handleLogout} style={{backgroundColor: '#4942E4'}} >Logout</Button>
     
        </div>
      
  )
}

export default NavBar
