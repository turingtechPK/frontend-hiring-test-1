import React from "react";
import logo from "../../assets/images/tt-logo.png";
import Toolbar from "@mui/material/Toolbar";
import { StyledAppBar, StyledButton } from "./styles";

export const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <img
          src={logo}
          alt="Company Logo"
          style={{ height: "30px", marginRight: "10px" }}
        />

        <StyledButton>Log out</StyledButton>
      </Toolbar>
    </StyledAppBar>
  );
};
