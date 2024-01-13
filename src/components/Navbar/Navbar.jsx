import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

function BrandExample() {
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand className="d-flex align-items-center" href="/">
          <img alt="Logo" src="logo.png" width="300" height="40" />{" "}
        </Navbar.Brand>
        <button className="my-btn">Logout</button>
      </Container>
    </Navbar>
  );
}

export default BrandExample;
