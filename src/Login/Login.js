import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Header from "../Header/Header";
import { loginService } from "../Service/Service";
import Cookies from "js-cookie";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isAuth = Cookies.get("jwt_token");

  //Token exists then redirects to main dashboard
  if (isAuth) {
    window.location.href = "/home";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      username: username,
      password: password,
    };
    const loginResponse = await loginService(userData);
    Cookies.set("jwt_token", loginResponse.data.access_token);
    window.location.href = "/home";
  };

  return (
    <div style={{ backgroundColor: "#F3EBEB" }}>
      <Header />
      <Container
        component="main"
        maxWidth="xs"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "91vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ backgroundColor: "white" }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <InputLabel
                htmlFor="username"
                align="Left"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                User Name
              </InputLabel>
              <TextField
                required
                fullWidth
                id="username"
                label="Email"
                name="username"
                autoComplete="username"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ margin: "25px auto" }}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputLabel
                htmlFor="password"
                align="Left"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Password
              </InputLabel>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ margin: "25px auto" }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                align="Left"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#4f46f8",
                  textTransform: "none",
                }}
              >
                Log in
              </Button>
            </Box>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default SignIn;
