import { Box } from "@mui/system";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Typography, InputAdornment } from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "@/api/routes";
import { useRouter } from "next/router";
export const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
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
    <Box
      sx={{
        backgroundColor: "white",
        maxHeight: "220px",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        padding: "30px 20px",
        marginTop: "15vh",
      }}
    >
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
                <PermIdentityOutlinedIcon />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Box>
      <Box
        sx={{
          marginTop: "30px",
        }}
      >
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
      <Box
        sx={{
          color: "white",
          backgroundColor: "#5E56FF",
          border: "none",
          padding: "10px",
          fontSize: "0.8rem",
          fontWeight: "800",
          width: "80px",
          borderRadius: "2px",
          marginTop: "20px",
          textAlign: "center",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={handleSubmit}
      >
        {" "}
        Log in
      </Box>
    </Box>
  );
};
