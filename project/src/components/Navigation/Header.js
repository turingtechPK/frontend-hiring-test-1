import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";

import "./Header.css";

const Header = () => {
  return (
    <Navbar bg="white" variant="light">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/TT Logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
