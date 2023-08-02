import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { Icon } from '@mui/material';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <div>
            <Image
            src={'/images/logo.png'}
            alt='Logo'
            width={250}
            height={30}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}