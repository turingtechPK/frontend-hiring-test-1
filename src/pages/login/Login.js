import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { getToken } from "../../api/apiUtils";
import { makeStyles } from "@mui/styles";
import { LockOutlined, PersonOutline } from "@mui/icons-material";

const useStyles = makeStyles({
  loginBtn: {
    
    justifyContent: "center",
    display: "flex",
  },
  loginForm: {
    display: "flex",
    margin: "120px",
    marginLeft: "25%",
    marginRight: "25%",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
    backgroundColor: "white",
  },
  loginBackground: {
    background: "#f4efee",
    width: "100%",
    height: "100vh",
    flexDirection: "column",
    display: "flex",
  },
});

const Login = () => {
  const navigate = useNavigate();

  const classes = useStyles();
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
                    style={{ width: "500px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutline />
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
                    style={{ width: "500px" }}
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
                className={classes.loginBtn}
                type="submit"
                fullWidth
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
