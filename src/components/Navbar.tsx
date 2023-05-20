import { useContext } from "react";
import { Header, Button } from "@mantine/core";
import Image from "next/image";
import { AuthContext } from "@/components";
import Router from "next/router";

export default function Navbar() {
  const { token, clearAuthData } = useContext(AuthContext);

  const handleLogout = () => {
    clearAuthData();
    Router.push("/login");
  };

  return (
    <Header
      height={{ base: 50, md: 70 }}
      p="md"
      style={{ boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.5)" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image src="/Logo.png" alt="Logo" width="300" height="40" />
        {token && (
          <Button
            color="indigo"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogout();
              }
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </Header>
  );
}
