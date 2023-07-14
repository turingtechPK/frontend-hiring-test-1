import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//mui
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

//api
import { login, refreshToken } from "../utilities/api";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const Value = e.target.value;
    setUserData({ ...userData, [e.target.name]: Value });
  };
  const handleRefresh = async () => {
    const response = await refreshToken();
    localStorage.setItem("access_token", response.data.access_token);
  };
  const handleSubmit = async () => {
    const response = await login(userData.name, userData.password);

    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);

    navigate("/home");

    const timeoutID = setTimeout(() => {
      handleRefresh();
    }, 540000);
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/home");
    }
  }, []);

  return (
    <div id="login">
      <div id="parentDiv">
        <p>User Name</p>
        <OutlinedInput
          className="outlined-adornment-weight"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Username"
          startAdornment={
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />
        <p>Password</p>
        <OutlinedInput
          type="password"
          className="outlined-adornment-weight"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
          hidden
          startAdornment={
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />
        <Button onClick={handleSubmit} variant="contained">
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Login;
