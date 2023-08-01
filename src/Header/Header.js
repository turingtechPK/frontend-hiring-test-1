import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import logo from "../logo.png";
import Logout from "../Logout/Logout";
import Cookies from "js-cookie";

export default function Header() {
  const isAuth = Cookies.get("jwt_token");

  return (
    <div>
      <AppBar position="relative" style={{ background: "#f5f5f5" }}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <Box component="img" sx={{ height: 50 }} alt="Logo" src={logo} />
          {isAuth && <Logout />}
        </Toolbar>
      </AppBar>
    </div>
  );
}
