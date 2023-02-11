import { useAuth } from "@/hooks/useAuth";
import { COLORS, THEME } from "@/shared/constants";
import TTLogo from "@public/TTLogo.png";
import { Button, ConfigProvider, Layout } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const { Header, Content } = Layout;

interface PageWrapperProps {
  children?: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const router = useRouter();
  const { pathname } = router;
  const { logout } = useAuth();
  const isLoginPage = pathname === "/";

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <ConfigProvider theme={THEME}>
      <Layout style={{ minHeight: "100%" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "auto",
            background: COLORS.white,
          }}
        >
          <Image
            src={TTLogo}
            alt="Turing Logo"
            priority
            style={{ width: "300px", lineHeight: 0, objectFit: "contain" }}
          />
          {!isLoginPage && (
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Header>
        <Content
          style={{
            padding: "0px 50px",
            display: "flex",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {children}
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default PageWrapper;
