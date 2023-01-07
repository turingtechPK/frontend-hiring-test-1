import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
