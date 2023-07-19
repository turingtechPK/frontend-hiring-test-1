import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import classes from "./login.module.css";
import { getToken } from "../../api/apiUtils";
import { makeStyles } from "@mui/styles";
import { AccountCircle, LockOutlined } from "@mui/icons-material";


const Login = () => {
  const navigate = useNavigate();

  const useStyleClasses = makeStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onLoginHandler = async (event) => {
    event.preventDefault();
    await getToken(userName, password);
    navigate("/main");
  };

  return (
    <div>
      <div className={classes.loginBackground}>
        <Header hideLogout />

        <div className={classes.loginForm}>
          <div className="form">
            <form onSubmit={onLoginHandler}>
              <div>
                <label>Username </label>

                <Box
                  sx={{
                    display: "flex",
                    margin: "10px",
                    width: "100%",
                  }}
                >
                  <TextField
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Email"
                    onChange={handleUserNameChange}
                    id="outlined-required"
                    variant="outlined"
                  />
                </Box>
              </div>
              <div>
                <label>Password </label>
                <Box
                  sx={{
                    display: "flex",
                    margin: "10px",
                    width: "100%",
                  }}
                >
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    id="outlined-password-input"
                    type="password"
                    autoComplete="current-password"
                  />
                </Box>
              </div>
              <Button
                className={useStyleClasses.loginBtn}
                sx={{
                  borderRadius: 0,
                  textTransform: "none",
                  marginTop: "10px",
                  backgroundColor: "#4F46F8",
                }}
                fullWidth
                type="submit"
                variant="contained"
                onClick={onLoginHandler}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
