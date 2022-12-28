import React from "react";
import { Navbar, Button } from "react-bootstrap";
import logo from "../images/TT Logo.png";
import TokenService from "../services/token.service";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { removeUser, getUser } = TokenService;
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    navigate("/");
  };
  return (
    <Navbar className="justify-content-between" bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <img
          src={logo}
          height="30"
          className="d-inline-block align-top m-4"
          alt="Logo"
        />
      </Navbar.Brand>
      {getUser() && (
        <Button className="m-4" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Navbar>
  );
};

export default Nav;
