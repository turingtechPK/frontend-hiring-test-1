import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { ACCESS_TOKEN, URL } from "../constants";
import { startTokenRefresh } from "../utils/authUtils";

const defaultTheme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("username") && data.get("password")) {
      try {
        const response = await axios.post(`${URL}/auth/login`, {
          username: data.get("username"),
          password: data.get("password"),
        });

        if (response.data.access_token) {
          localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
          setAuthenticated(true);
          startTokenRefresh();
          navigate("/");
        } else {
          setFormErrors("Invalid credentials. Please try again.");
        }
      } catch (error) {
        setFormErrors("An error occurred while logging in. Please try again.");
        console.error("Login Error: ", error);
      }
    } else {
      setFormErrors("Please fill in all required fields.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: "10%" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ marginBottom: 2 }}
            />
            {formErrors && (
              <Typography color="error" sx={{ marginBottom: 2 }}>
                {formErrors}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
