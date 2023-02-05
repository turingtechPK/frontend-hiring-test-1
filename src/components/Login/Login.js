import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Lock } from "@mui/icons-material";

const Login = ({ setAccessToken, setRefreshToken }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    axios
      .post("https://frontend-test-api.aircall.io/auth/login", {
        username: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      style={{
        backgroundColor: "#f4eeee",
        width: "100%",
        height: "100%",
        display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Box
        style={{
          backgroundColor: "white",
          width: "400px",
          height: "270px",
          // display: "flex",
          // flexDirection: "column",
          margin: "auto",
          padding: "30px",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typography variant="subttile2" style={styles.title}>
            <span style={{ color: "red" }}>* </span>User Name
          </Typography>
          <TextField
            placeholder="Email"
            style={styles.textField}
            {...register("email", { required: true })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PermIdentityIcon />
                </InputAdornment>
              ),
            }}
          />{" "}
          <Typography variant="subttile2" style={styles.title}>
            <span style={{ color: "red" }}>* </span>Password
          </Typography>
          <TextField
            {...register("password", { required: true })}
            style={styles.textField}
            placeholder="Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          <Button style={styles.btn} variant="contained" type="submit">
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;

const styles = {
  title: {
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "10px",
  },
  textField: {
    marginBottom: "20px",
  },
  btn: {
    width: "100px",
    marginTop: "10px",
    textTransform: "none",
  },
};
