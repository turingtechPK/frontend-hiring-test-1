import React from "react";
import { Card, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("here");
    navigate("/Dashboard");
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
        />
        <p>
          <span style={{ color: "red" }}>*</span>Password
        </p>
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined />}
          style={{ borderRadius: 0 }}
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
