'use client'

import '../assets/css/global.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function RootLayout({ children }) {
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