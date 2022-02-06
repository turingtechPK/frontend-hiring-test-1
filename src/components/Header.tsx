import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap'

function Header() {
  return <>
  <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">TuringTech</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Sign In</Nav.Link>
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  </>;
}

export default Header;
