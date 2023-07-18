import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { Container, TextField, Button, Paper, FormControl, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';

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


const SignInForm = () => {
    const navigate = useNavigate();
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const Base_URL= 'https://frontend-test-api.aircall.io';

        try{
            const response = await axios.post(
                Base_URL,{
                    username: email,
                    password: password,
                }
            );
        
            const {access_token} = response.data;
            localStorage.setItem("access_token", access_token);
            navigate("/dashboard")
        } catch (error){
            setError('Password or Email is Incorrect');
        }
    }

    return(
        <div >
            <Container className="mt5 pa5" maxWidth="sm">
                <Paper elevation={2} sx={{padding: 2}}>
                <Typography variant="h5" sx={{pb:3}}>
                    Log In To the Phone API
                </Typography>

                <FormControl  fullWidth sx={{marginBottom: 3}}>
                    <TextField className="m4"
                        label= "Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        label= "Password"
                        variant="outlined"
                        type="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }}
                        sx={{marginTop:3,marginBottom:3}}
                    />
                
                <ThemeProvider theme={theme}>
                {error && 
                    <p>{error}</p>
                }
                <Button type="submit" variant='contained' onClick={handleSubmit}>Sign In</Button>
                </ThemeProvider>
                </FormControl>
                </Paper>
            </Container>
        </div>
    )
}


export default SignInForm;