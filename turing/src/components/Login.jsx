import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION, REFRESH_TOKEN_MUTATION } from '../graphql/mutations';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from '@material-ui/core';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const [refreshToken] = useMutation(REFRESH_TOKEN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: {
          login: { access_token },
        },
      } = await login({ variables: { username, password } });
      localStorage.setItem('access_token', access_token);
      onLogin(access_token);

      // Set a timeout to refresh the token before it expires
      setTimeout(async () => {
        const {
          data: {
            refreshToken: { access_token: newToken },
          },
        } = await refreshToken();
        localStorage.setItem('access_token', newToken);
      }, 9 * 60 * 1000); // 9 minutes in milliseconds
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Log In'}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
