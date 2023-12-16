import React from "react";
import { Link, useLocation } from "react-router-dom";
//@ts-ignore
import TTLogo from "../../Images/TTLogo.png";

const Navbar = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div style={styles.navbar}>
      <img src={TTLogo} alt="Logo" style={styles.logo} />
      {!isHomePage && (
        <Link to="/" style={styles.links}>
          <button style={styles.button}>Log out</button>
        </Link>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: "#333",
  },
  logo: {
    height: "35px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4f46f8",
    width: "100px",
    color: "#fff",
    border: "none",
    outline: "none",
    borderRadius: "3px",
    cursor: "poiner",
  },
  links: {
    cursor: "poiner",
  },
};
export default Navbar;
