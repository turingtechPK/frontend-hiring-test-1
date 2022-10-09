import { Button, Checkbox, Form, Input, Modal,Card,Avatar } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {loginUser} from "C:/Users/ehtis/Desktop/frontend_test/pages/api/api"


const Login = () => {
  const router = useRouter();
  function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
  }
   const handleSubmit = async e => {
    // e.preventDefault();
    const token = await loginUser({
      username:e.username,
      password:e.password
    });
    console.log(token)
    setToken(token);
    router.push("/calls");
  }
  // 
  return (
    <Card title="LOGIN" style={{ width: 300 }}>
    
    <Form
      name="basic"
      labelCol={{
        span: 9,
      }}
      wrapperCol={{
        span: 20,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input required />
     
      </Form.Item>
     
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 12,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 20,
        }}
      >
        <Button type="primary" htmlType="submit" style={{width:"100%"}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Card>
  );
};
export default Login;
