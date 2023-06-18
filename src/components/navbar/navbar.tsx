import React from 'react'
import { NavbarStyled } from './navbar.style'
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';

export const Navbar = () => {
  const navigate = useNavigate();
  const Logout = ()=>{
    localStorage.clear()
    navigate('/')
  }
  return (
    <NavbarStyled>
      <Box className='container'>
        <Box className='navbar-contents'>
          <img src={process.env.PUBLIC_URL+'/TT Logo.png'} alt='Turing Technologies' height={30}></img>
          <Button onClick={Logout} variant="outlined" className='button'>Logout</Button>
        </Box>
      </Box>
    </NavbarStyled>
  )
}

