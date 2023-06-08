import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import loginService from "../services/login";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const newObj = { username, password };
    console.log("nn", newObj);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      login(user);
      navigate("/dashboard");
      setUsername("");
      setPassword("");
      console.log(user);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        handleUsername={handleUsername}
        password={password}
        handlePassword={handlePassword}
      />
    </>
  );
};

export default Login;
