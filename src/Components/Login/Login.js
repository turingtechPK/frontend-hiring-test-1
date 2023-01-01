import React from "react";
import axios from "axios";
import { Button, Input } from "antd";
import "antd/dist/reset.css";
import "./Login.css";
import Logo from "../../Img/Logo.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameErr, setUsernameErr] = React.useState(false);
  const [passwordErr, setPasswordErr] = React.useState(false);

  const login = () => {
    if (username === "" && password === "") {
      setUsernameErr(true);
      setPasswordErr(true);
    } else if (username === "") setUsernameErr(true);
    else if (password === "") setPasswordErr(true);
    else {
      setPasswordErr(false);
      setUsernameErr(false);
      axios
        .post("https://frontend-test-api.aircall.io/auth/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          console.log("access: ", response.data.access_token);
          localStorage.setItem("access", response.data.access_token);
          console.log("refresh: ", response.data.refresh_token);
          localStorage.setItem("refresh", response.data.refresh_token);
          window.location = "/calls";
        });
    }
    //console.log(usernameErr, passwordErr);
  };
  return (
    <div>
      <div className="header">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="form_wrapper">
        <div className="form">
          {/* <form action="" noValidate autoComplete="off" onSubmit={login}> */}
          <h4>
            {" "}
            <span>* </span>User Name
          </h4>
          <Input
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
            status={usernameErr ? "error" : ""}
            onChange={(e) => setUsername(e.target.value)}
          />

          <h4>
            {" "}
            <span>* </span>Password
          </h4>
          <Input
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
            status={passwordErr ? "error" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="primary" onClick={() => login()}>
            Log in
          </Button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
