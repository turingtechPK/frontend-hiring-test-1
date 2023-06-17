import { useState, useEffect, useContext } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../services/api";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import TTLogo from '../images/TTLogo.png'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthData } = useContext(AuthContext);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate= useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { username, password } });
      setAuthData(data.login);
      console.log(data.login)
      navigate("/dashboard");
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      {/* upper nav bar */}
      <div className="nav-bar  py-4 px-6 border shadow-sm   " >
        <img src={TTLogo} alt="Turing Logo" className="  h-8 " />
      </div>
      {/* login form */}
      <div className="flex flex-col items-center justify-center h-screen " style={{backgroundColor: "#f3eeee"}}>
      <div  className="  p-10 "
        style={{
          padding: "xl",
          boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "md",
          backgroundColor: "#fff",
          width: "700px",
        }}
      >
        <div className="flex  flex-col mb-10 ">
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your email"
          required
          variant="filled"
          size="small"
          style={{marginBottom:35 }}
        />
        <TextField
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
          variant="filled"
          size="small"
          type="password"
          style={{ marginBottom: 15 }}
        />
        </div>
        <div >
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
        </div>

     
    </div>
  );
};

export default Login;
