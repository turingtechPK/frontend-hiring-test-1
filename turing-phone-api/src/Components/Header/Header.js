import React from 'react';
import logo from '../../Assets/TT Logo.png';
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#4F46F8',
      darker: '#4137fa',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});



const Header = () => {

    return(
        <div className='pt3 pl7 pr7 pb3 flex justify-between shadow-1'>
            <div>   
                <img className='grow' src={logo} height={'40px'} alt='Turing Tech Logo'/>
            </div>
            <div className=''>
                <ThemeProvider theme={theme}>
                <Button variant='contained' href='login'>Log Out</Button>
                </ThemeProvider>
            </div>
        </div>
    )

    
}

export default Header;