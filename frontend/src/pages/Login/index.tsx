import { useState } from "react";
import { login } from "../../common/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputLabel,
  TextField,
  colors,
} from "@mui/material";
import TopBar from "../../components/TopBar";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginRequest = async () => {
    setLoading(true);
    const response = await login(username, password);
    if (response) {
      navigate("/");
    }
    setLoading(false);
  };
  return (
    <>
      <TopBar />
      <Container
        maxWidth="sm"
        sx={{
          marginTop: "25vh",
          border: 0.2,
          borderColor: colors.grey[500],
        }}
      >
        <Box sx={{ mt: 1, p: 3 }}>
          <InputLabel>User Name</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputLabel>Password</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={loginRequest}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress color="info" /> : "Log In"}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Login;
