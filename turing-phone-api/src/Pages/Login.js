import React from 'react';
import logo from '../Assets/TT Logo.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignInForm from '../Components/SignInForm/SignInForm';

const Login = () => {

    return(
        <div>
          <div className='pt3 pl7 pr7 pb3 flex align-center shadow-1'>
              <div>   
                  <img className='grow' src={logo} height={'40px'} alt='Turing Tech Logo'/>
              </div>
          </div>

          <SignInForm/>
        </div>
    )
}

export default Login;