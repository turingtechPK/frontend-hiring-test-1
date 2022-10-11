import React from "react";
import { Button, Header } from "../../libs/shared-components";
import navimage from "../../libs/shared-assets/TTLogo.png";
import Router, { useRouter } from "next/router";

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
    <Header>
      <img src={navimage.src} alt="image" />
      <Button type="primary" size="large" onClick={logout}>
        Logout
      </Button>
    </Header>
  );
};

export default Navbar;
