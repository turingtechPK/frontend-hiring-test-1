"use client";
import {
  Button,
  AppBar as MuiAppBar,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import logo from "../public/logo.png";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      sx={{
        paddingTop: "10px",
        paddingBottom: "10px",
        border: "1px solid #e0e0e0",
      }}
    >
      <Box marginLeft="2%">
        <Image src={logo} height={28} alt="Website Logo" />
      </Box>

      <div style={{ marginLeft: "auto", display: "flex", gap: "16px" }}>
        {session?.user ? (
          <Button
            style={{
              backgroundColor: "blue",
              color: "white",
              fontSize: "14px",
              width: "100px",
              fontWeight: "bold",
              marginRight: "2.5%",
              textTransform: "none",
            }}
            onClick={() => signOut()}
          >
            Log out
          </Button>
        ) : (
          <Button
            style={{
              backgroundColor: "blue",
              color: "white",
              fontSize: "14px",
              width: "100px",
              fontWeight: "bold",
              marginRight: "2.5%",
              textTransform: "none",
            }}
            onClick={() => signIn()}
          >
            Log in
          </Button>
        )}
      </div>
    </Box>
  );
};

export default Navbar;
