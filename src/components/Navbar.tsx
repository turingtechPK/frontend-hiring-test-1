import React from 'react';
import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { logout } from '../feature/userSlice'
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.svg'
import { Box } from '@mui/material';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', background: 'white' }}>
        <Box m={2}>
          <img
            src={Logo}
            alt="My SVG Image"
            style={{ width: 310, height: 40 }}
          />
        </Box>
        <Button style={{ background: '#4F46F8', color: 'white' }} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
