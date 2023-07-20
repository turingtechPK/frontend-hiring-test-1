import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import classes from "./Header.module.css";
import Logo from "../../TTLogo.png";
function Header({ hideLogout, navigate }) {
  const onLogoutHandler = async () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.appBar} style={{ boxShadow: "none" }}>
        <img src={Logo} alt="Logo" className={classes.logo} />

        {
          //hide or show logout button depending on page
          !hideLogout ? (
            <Button
              onClick={onLogoutHandler}
              variant="contained"
              sx={{
                marginLeft: "auto",
                borderRadius: 0,
                textTransform: "none",
                backgroundColor:"#4f46f8",
              }}
              className={classes.Button}
            >
              Log out
            </Button>
          ) : (
            ""
          )
        }
      </Toolbar>
    </AppBar>
  );
}

export default Header;
