import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";

const Auth: React.FC = () => {
  const { loginUser, logoutUser, username } = useAuth();
  const [inputUsername, setInputUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await loginUser(inputUsername, password);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: { xs: "90%", sm: 350 },
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <CardContent>
          {username ? (
            <>
              <Typography variant="h6" sx={{ fontSize: "1.2rem", marginBottom: 2 }}>
                Welcome, <strong>{username}</strong>!
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={logoutUser}
                sx={{
                  width: "100%",
                  padding: 1.5,
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
                Login
              </Typography>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{
                  width: "100%",
                  padding: 1.5,
                  fontSize: "1rem",
                  fontWeight: 500,
                  backgroundColor: "#2575fc",
                  "&:hover": {
                    backgroundColor: "#6a11cb",
                  },
                }}
              >
                Login
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Auth;
