import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Row } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setIsSubmitting(true);
      const { username, password } = values;
      const { data } = await authService.login(username, password);
      login(data);
      router.push("/call-list");
    } catch (error) {
      notification.open({
        type: "error",
        message: (error as Error).message,
        duration: 2,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Row justify="center" style={{ alignSelf: "center" }}>
      <Col span={24}>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          style={{
            minWidth: "600px",
            alignSelf: "center",
            background: "#FFFFFF",
            padding: "30px 30px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Form.Item
            label="User Name"
            name="username"
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
              size="large"
              disabled={isSubmitting}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;
