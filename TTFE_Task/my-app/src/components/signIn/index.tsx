import React from "react";
import { MainContainer, LogoContainer, Logo } from "./styled.components";
import TuringTechLogo from "../../assets/images/TtLogo.png";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./mutations";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });
  const [loginUser, { error, loading, data }] = useMutation(LOGIN_USER);
  const onFinish = React.useCallback(
    (e: any) => {
      setFormState({
        email: e.email,
        password: e.password,
      });
      if (formState.email.length > 0 && formState.password.length > 0) {
        loginUser({
          variables: {
            input: {
              username: formState.email,
              password: formState.password,
            },
          },
        });
      }
    },
    [formState]
  );
  if (data) {
    localStorage.setItem("Item", data.login.access_token);
    navigate("/list");
  }
  if (error) {
    console.log(error);
  }
  if (loading) {
    <h1>loading...</h1>;
  }
  return (
    <>
      <LogoContainer>
        <Logo src={TuringTechLogo} />
      </LogoContainer>
      <MainContainer>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="User Name"
            name="email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </MainContainer>
    </>
  );
};

export default SignIn;
