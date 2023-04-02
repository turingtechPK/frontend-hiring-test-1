import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useAppDispatch } from '../state/hooks';
import { userLogin } from "../state/ducks/auth/authActions";


const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const handleLogin = () => {
    console.log("username", username, password);
    dispatch(userLogin({ username: username, password: password }));
  };
  return (
    <Box
      sx={{
        backgroundColor: "#F4EEEE",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "2rem",
          paddingY: "3rem",
          borderRadius: "0px",
          // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: "600px",
        }}
      >
        <Typography
          variant="subtitle1"
          textAlign={"left"}
          sx={{ marginBottom: ".5rem" }}
        >
          <span style={{ color: "red" }}>*</span> Username
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="dense"
          variant="outlined"
          sx={{ marginBottom: "2rem" }}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <PersonOutlineOutlinedIcon sx={{ marginRight: "5px" }} />
            ),
          }}
        />
        <Typography
          variant="subtitle1"
          textAlign={"left"}
          sx={{ marginBottom: ".5rem" }}
        >
          <span style={{ color: "red" }}>*</span> Password
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: <LockOutlined sx={{ marginRight: "5px" }} />,
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Button
            onClick={handleLogin}
            sx={{
              backgroundColor: "#1990FF",
              color: "white",
              borderRadius: 0,
              marginTop: "1.5rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1990FF",
              },
            }}
            variant="contained"
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
