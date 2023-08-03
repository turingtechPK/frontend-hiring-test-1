import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { Button, Icon } from '@mui/material';
import { logout } from '../../helpers/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <Button onClick={()=> router.push('/')}>
            <Image
            src={'/images/logo-only.png'}
            alt='Logo'
            width={30}
            height={30}
            />
            </Button>
            <Typography sx={{marginLeft:'10px', flexGrow:1}} fontWeight={800}>Turing Technologies</Typography>
            <Button onClick={handleLogout}>
              Logout
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}