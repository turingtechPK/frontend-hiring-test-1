import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  InputLabel,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthContext from "../../AuthContext";
import { login } from "./api";
import { authStyles } from "./authStyles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigateTo = useNavigate();

  const loginMutation = useMutation(login, {
    onError: (error) => {
      console.error("Login error:", error);
    },
    onSuccess: (data) => {
      sessionStorage.setItem("accessToken", data?.access_token);
      sessionStorage.setItem("id", data?.user?.id);
      setIsLoggedIn(true);
      navigateTo("/calls");
    },
  });

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Please fill in both fields.");
      return;
    }

    setError("");
    loginMutation.mutate({ username: username, password: password });
  };

  return (
    <Container maxWidth="sm" sx={authStyles.container}>
      <div>
        <InputLabel htmlFor="username" sx={authStyles.labelUser}>
          <span style={authStyles.astColor}>*</span> Username
        </InputLabel>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <IconButton sx={authStyles.icon} size="small">
                <Person2OutlinedIcon />
              </IconButton>
            ),
          }}
        />
        <InputLabel htmlFor="password" sx={authStyles.labelPass}>
          <span style={authStyles.astColor}>*</span> Password
        </InputLabel>
        <TextField
          fullWidth
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <IconButton sx={authStyles.icon} size="small">
                <LockOutlinedIcon />
              </IconButton>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={authStyles.loginBtn}
        >
          Log in
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        {loginMutation.isError && (
          <Typography color="error">Login failed. Please try again.</Typography>
        )}
      </div>
    </Container>
  );
};

export default Login;
