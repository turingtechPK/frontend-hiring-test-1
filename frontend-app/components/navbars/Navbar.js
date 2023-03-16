import React from "react";
import { Box } from "@mui/system";
import Image from "next/image";
import ttLogo from "../assets/tt-logo.png";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
const styles = {
  navbarContainer: {
    width: "100vw",
    height: "80px",
    padding: "20px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "2px solid #D4D3D3",
  },
  button: {
    color: "white",
    backgroundColor: "#5E56FF",
    border: "none",
    padding: "10px",
    borderRadius: "2px",
    fontSize: "0.8rem",
    fontWeight: "800",
    "&:hover": {
      cursor: "pointer",
    },
  },
};

export const Navbar = () => {
  const router = useRouter();
  const logOut = () => {
    window.localStorage.removeItem("access_token");
    router.push("/sign-in");
  };
  return (
    <Box sx={styles.navbarContainer}>
      <Image
        src={ttLogo}
        alt="Turing Technologies"
        style={{
          width: "200px",
          objectFit: "contain",
        }}
      />
      <Box onClick={logOut} sx={styles.button}>
        Log Out
      </Box>
    </Box>
  );
};
