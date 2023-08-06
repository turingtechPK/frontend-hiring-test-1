import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import AuthContext from "../../AuthContext";
import TTLogo from "../../assets/TTLogo.png";
import { appBarStyles } from "./appBarStyles";

const TTAppBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("id");
    setIsLoggedIn(false);
    navigateTo("/");
  };

  return (
    <AppBar position="static" sx={appBarStyles.app}>
      <Toolbar>
        <Box sx={appBarStyles.flexGby1}>
          <img
            src={TTLogo}
            alt="Turing Technologies"
            style={appBarStyles.logo}
          />
        </Box>
        {isLoggedIn && (
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TTAppBar;
