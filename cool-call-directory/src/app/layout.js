'use client'

import '../assets/css/global.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import { useEffect } from 'react';
import { authRefresh } from '../services/auth';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function RootLayout({ children }) {
  useEffect(() => {
    authRefresh();
    
    // Set up the interval to call authRefresh every 9 minutes (9 * 60 * 1000 milliseconds)
    const intervalId = setInterval(() => {
      authRefresh();
    }, 9 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar/>
            <Container maxWidth="xl" sx={{padding: 3}}>
              {children}
            </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}