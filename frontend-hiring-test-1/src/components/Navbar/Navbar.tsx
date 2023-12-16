import React from "react";
import { useLocation } from "react-router-dom";
//@ts-ignore
import TTLogo from "../../Images/TTLogo.png";

const Navbar = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div style={styles.navbar}>
      <img src={TTLogo} alt="Logo" style={styles.logo} />
      {!isHomePage && <button style={styles.button}>Log out</button>}
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px", // Updated padding
    backgroundColor: "white", // Updated background color
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Added box shadow
    color: "#333", // Adjusted text color
  },
  logo: {
    height: "35px", // Adjust the height as needed
  },
  button: {
    padding: "10px",
    backgroundColor: "#4f46f8",
    width: "100px",
    color: "#fff",
    border: "none",
    outline: "none",
    borderRadius: "3px",
  },
};
export default Navbar;
