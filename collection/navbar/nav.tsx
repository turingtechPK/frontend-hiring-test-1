import React from "react";
import { Button, Layout } from "antd";
import navimage from "../../libs/images/TTLogo.png";
import Router, { useRouter } from "next/router";
import { StyledHeader } from "./navstyles";

const Navbar = () => {
  async function logout(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      Router.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <StyledHeader>
      <img src={navimage.src} alt="image" />
      <Button type="primary" size="large" onClick={logout}>
        Logout
      </Button>
    </StyledHeader>
  );
};

export default Navbar;
