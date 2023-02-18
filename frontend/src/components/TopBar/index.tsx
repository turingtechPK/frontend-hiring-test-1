import React from "react";
import { AppBar, Grid, colors, Button, Box } from "@mui/material";
import { logout } from "../../common/auth";
const logo = require("../../assets/tt-logo.png");

const TopBar = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: 0.1, borderColor: colors.grey[500] }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingRight: 1 }}
      >
        <Grid item>
          <Box
            component="img"
            sx={{ height: 45, p: 1 }}
            alt="Logo"
            src={logo}
          />
        </Grid>
        <Grid item hidden={window.location.pathname === "/login"}>
          <Button variant="contained" onClick={logout}>
            Log out
          </Button>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default TopBar;
