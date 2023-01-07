import React from "react";
import TTLogo from "../../Assets/TTLogo.png";
import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="nav">
      <img
        src={TTLogo}
        style={{
          width: "180px",
          height: "60px",
          objectFit: "contain",
        }}
        alt="Turing Tech"
      />
      {location.pathname === "/Dashboard" ? (
        <Button
          onClick={() => {
            handleLogout();
          }}
          style={{
            borderRadius: 0,
            backgroundColor: "#4f46f8",
          }}
          type="primary"
        >
          Log out
        </Button>
      ) : null}
    </div>
  );
};

export default Navbar;
