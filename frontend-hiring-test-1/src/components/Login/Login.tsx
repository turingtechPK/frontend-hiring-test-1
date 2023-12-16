import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { login } from "../../services/authservice.ts"; // Assuming you have the login function in authService

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    try {
      // Perform the login and obtain the access token
      const authResponse = await login(email, password);
      const accessToken = authResponse.access_token;

      // Store the access token securely, for example, in localStorage
      localStorage.setItem("accessToken", accessToken);

      navigate("/call-list");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (display a message to the user, etc.)
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "50px",
        background: "#fff", // Set the background color
      }}
    >
      <div
        style={{
          width: 400,
          padding: 32,
          borderRadius: 8,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          labelCol={{ span: 24 }} // Labels take the full width
          wrapperCol={{ span: 24 }} // Inputs take the full width
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email  "
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
