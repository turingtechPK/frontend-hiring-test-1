import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import logo from "../assets/TT Logo.png";
const Logo = styled("img")`
  max-height: 40px;
`;

interface NavbarProps {
  onLoginClick: () => void;
  isAuth: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, isAuth }) => {
  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Toolbar>
        <Logo src={logo} alt="Logo" />
        <Typography variant="h6" sx={{ flexGrow: 1 }} />
        {isAuth && (
          <Button
            variant="contained"
            onClick={onLoginClick}
            sx={{
              backgroundColor: "#4F46F8",
              textTransform: "none",
              borderRadius: 0,
              letterSpacing: "1px",
              px: "28px",
              "&:hover": {
                backgroundColor: "#4F46F8",
              },
            }}
          >
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
