import React, { useState, SyntheticEvent } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { AlertColor, Button, Grid, TextField } from '@mui/material';
import Loader from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../redux-hooks';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../feature/userSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    username: string;
  };
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(loginUser({ username, password }))
        .unwrap()
        .then(() => {
          navigate('/');
        });
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const isLoginDisabled = username.trim() === '' || password.trim() === '';

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Container maxWidth="xs" style={{ height: '80vh', display: 'flex', alignItems: 'center' }}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Login</h2>
            <form>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                    disabled={isLoginDisabled} 
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default LoginPage;
