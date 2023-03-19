import React from "react";
import { Box } from "@mui/system";
import Image from "next/image";
import logo from "../assets/images/TT Logo.png";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(() => ({
  appBar: {
    height: "72px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #e7e7e7",
  },

  logo: {
    width: "250px",
    objectFit: "contain",
  },

  logoutButton: {
    color: "white",
    backgroundColor: "#514EF4",
    border: "none",
    padding: "6px 24px",
    borderRadius: "2px",
    textTransform: "none",
    fontSize: "0.9rem",
    fontWeight: "300",
    "&:hover": {
      backgroundColor: "rgba(81, 78, 244, 0.8)",
      cursor: "pointer",
    },
  },
}));

function NavBar(props: { button: any; }) {
  const router = useRouter();
  const classes = useStyles();
  const logOut = () => {
    window.localStorage.removeItem("access_token");
    router.push("/sign-in");
  };
  return (
    <Box className={classes.appBar}>
      <Image src={logo} alt="logo" className={classes.logo} />
      <Button 
      onClick={logOut} 
      className={classes.logoutButton} 
      style={{ display: props.button }}
      >Log out</Button>
    </Box>
  );
}

export default NavBar;
