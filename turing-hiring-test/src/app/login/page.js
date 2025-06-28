"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/lib/queries";
import Cookies from "js-cookie";
import Image from "next/image";

export default function LoginPage() {
  const [login] = useMutation(LOGIN_MUTATION);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.push("/calls");
    }
  }, [router]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await login({
        variables: {
          input: {
            username: values.email,
            password: values.password,
          },
        },
      });

      localStorage.setItem("access_token", data.login.access_token);
      Cookies.set("access_token", data.login.access_token, {
        path: "/",
        sameSite: "Lax",
        secure: false, // set to true for production
      });
      router.push("/calls");
    } catch (error) {
      message.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem 3rem",
          borderBottom: "1px solid #e8e8e8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Image
            src="/logo/tt_logo.png"
            alt="Turing Technologies"
            width={200}
            height={30}
            unoptimized={true}
          />
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "3rem",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            {/* User Name Field */}
            <Form.Item
              label={
                <span style={{ color: "#374151", fontWeight: "500" }}>
                  User Name
                </span>
              }
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              style={{ marginBottom: "1.5rem" }}
            >
              <Input
                placeholder="Email"
                prefix={<UserOutlined style={{ color: "#9ca3af" }} />}
                style={{
                  height: "48px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                }}
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label={
                <span style={{ color: "#374151", fontWeight: "500" }}>
                  Password
                </span>
              }
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              style={{ marginBottom: "2rem" }}
            >
              <Input.Password
                placeholder="Password"
                prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
                style={{
                  height: "48px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                }}
              />
            </Form.Item>

            {/* Login Button */}
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  width: "120px",
                  height: "44px",
                  backgroundColor: "#3b82f6",
                  borderColor: "#3b82f6",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
