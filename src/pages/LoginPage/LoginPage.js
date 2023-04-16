import { Card, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import './LoginPage.css'
const LoginPage = ({ setIsLoggedIn }) => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")


    const handleLogin = () => {
        // axios.post('https://frontend-test-api.aircall.io/auth/login', {
        //     username: userName,
        //     password: password,
        // })
        //     .then((response) => {
        //         setIsLoggedIn(true);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        setIsLoggedIn(true)
    };
    return (
        <div className='LoginPage'>
            <Card
                sx={{
                    width: 600,
                    height: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: 'center',
                    padding: "2%"
                }}>
                <div className='text'>
                    <p>User Name</p>
                    <TextField fullWidth value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                </div>
                <div className='text'>
                    <p>Password</p>
                    <TextField
                        fullWidth
                        value={password}
                        type='password'
                        onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className='button-container'>
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                    >Log In</Button>
                </div>
            </Card>
        </div>
    )
}

export default LoginPage