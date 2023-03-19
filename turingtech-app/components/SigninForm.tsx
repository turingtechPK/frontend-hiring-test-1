import { Box } from "@mui/system";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "@/api/routes";
import { useRouter } from "next/router";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({

  boxStyle:{
    backgroundColor: "white",
    maxHeight: "220px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    padding: "30px 20px",
    marginTop: "15vh",
  },

  loginButton: {
    color: "white",
    backgroundColor: "#2594fb",
    border: "none",
    padding: "6px 24px",
    borderRadius: "2px",
    textTransform: "none",
    fontSize: "0.9rem",
    fontWeight: "400",
    width: "100px",
    marginTop: "16px",
    "&:hover": {
      backgroundColor: "rgba(37, 148, 251, 0.8)",
      cursor: "pointer",
    },
  },
}));

function SigninForm() {
  const classes = useStyles();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      const { access_token, user } = data;
      window.localStorage.setItem("access_token", access_token);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box className={classes.boxStyle}>
      <Box>
        <TextField
          fullWidth
          value={formData.username}
          name="username"
          type="text"
          onChange={handleChange}
          label="Username"
          InputProps={{
            style: {
              display: "flex",
              alignItems: "center",
            },
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Box>
      <Box
        sx={{
          marginTop: "24px",
        }}>
        <TextField
          fullWidth
          value={formData.password}
          name="password"
          type="password"
          onChange={handleChange}
          label="Password"
          InputProps={{
            style: {
              display: "flex",
              alignItems: "center",
            },
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Box>
      <Button className={classes.loginButton} onClick={handleSubmit}>
        Log in
      </Button>
    </Box>
  );
}

export default SigninForm;
