import React from "react";
import { Navbar } from "../../components";
import { Routing } from "../routing";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Routing />
    </>
  );
};

export default Layout;
