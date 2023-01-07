import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { API_URL } from "../../api_url";
const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [empty, setEmpty] = useState(false);
  const navigate = useNavigate();
  const loginAuth = (data) => {
    axios
      .post(`${API_URL}/auth/login`, data)
      .then((result) => {
        localStorage.setItem("token", "Bearer " + result.data.access_token);
        navigate("/Dashboard");
      })
      .catch((err) => {
        console.log("in error");
        console.log(err);
      });
  };

  const handleLogin = () => {
    if (username === "" || password === "") {
      setEmpty(true);
    } else {
      loginAuth({ username: username, password: password });
    }
  };

  return (
    <div className="container">
      <Card
        style={{
          width: 550,
          height: 300,
          borderRadius: 0,
        }}
      >
        <p>
          <span style={{ color: "red" }}>*</span>User Name
        </p>
        <Input
          placeholder="Email"
          prefix={<UserOutlined />}
          style={{ borderRadius: 0 }}
          status={empty ? "error" : null}
          onFocus={() => setEmpty(false)}
          onChange={(e) => setUserName(e.target.value)}
        />
        <p>
          <span style={{ color: "red" }}>*</span>Password
        </p>
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined />}
          style={{ borderRadius: 0 }}
          status={empty ? "error" : null}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          onClick={() => {
            handleLogin();
          }}
          style={{
            borderRadius: 0,
            marginTop: "5%",
            backgroundColor: "#1a90ff",
          }}
          type="primary"
        >
          Log in
        </Button>
      </Card>
    </div>
  );
};

export default Login;
