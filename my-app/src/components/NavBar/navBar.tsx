import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss"; 

const Navbar: React.FC = () => {
  const { logoutUser, username } = useAuth();
  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.logo}>
          Call Management
        </Typography>
        <div className={styles.navItems}>
          {username  ? (
            <>
              <Typography variant="body1" className={styles.username}>
                Welcome, <strong>{username}</strong>!
              </Typography>
              <Button color="inherit" onClick={logoutUser} className={styles.logoutButton}>
                Logout
              </Button>
            </>
          ) : (
            <Button component={Link} to="/" color="inherit">
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
