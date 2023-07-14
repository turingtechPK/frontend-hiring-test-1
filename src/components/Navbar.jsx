import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//mui
import Button from "@mui/material/Button";
import logo from "../assets/TT Logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div id="navbar">
      <img src={logo} alt="" />
      <Button
        onClick={handleLogout}
        style={{
          display: `${
            window.location.pathname === "/login" ? "none" : "block"
          }`,
        }}
        variant="contained"
      >
        Log out
      </Button>
    </div>
  );
};

export default Navbar;
