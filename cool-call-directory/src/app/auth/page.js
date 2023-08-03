'use client'

import React, { useEffect, useState } from 'react';
import { TextField, Container, Paper, Typography } from '@mui/material';
import { auth } from '../../services/auth';
import { useRouter } from 'next/navigation';
import Button from '@mui/lab/LoadingButton';


const styles = {
  container: {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    padding: '20px',
    width: '500px',
    maxWidth: '90%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  submitButton: {
    marginTop: '16px',
  },
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const [success,setSuccess] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setAuthenticating(true);
    const success = await auth(username,password);
    setSuccess(success);
    setAuthenticating(false);
  };

  useEffect(()=>{
    if(success){
        router.push('/');
    }
  },[success])

  return (
    <Container style={styles.container}>
      <Paper style={styles.paper} elevation={3}>
        <Typography variant="h5">Login</Typography>
        <form style={styles.form}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            style={styles.submitButton}
            fullWidth
            loading={authenticating}
          >
            {success? 'Redirecting' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;