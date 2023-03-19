import Head from "next/head";
import NavBar from "@/components/NavBar";
import localFont from "next/font/local";

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import { refreshToken } from "@/api/routes";
import CallsList from "@/components/CallsList";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  table: {
    marginLeft: "28px",
    marginRight: "28px",
    marginTop: "14px",
    marginBottom: "0px",
  },
  page: {
    width: "100%",
    height: "100%",
    margin: "0px",
    position: "absolute",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  },
}));

const avenir = localFont({
  src: [
    {
      path: "../assets/font/AvenirLTStd-Black.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/font/AvenirLTStd-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/font/AvenirLTStd-Roman.otf",
      weight: "500",
      style: "normal",
    },
  ],
});

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  const updateToken = async () => {
    try {
      const resp = await refreshToken();
      window.localStorage.setItem("access_token", resp.access_token);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (!window.localStorage.getItem("access_token")) router.push("/sign-in");
    else {
      updateToken();
    }
  }, []);
  setInterval(() => {
    updateToken();
  }, 600000);

  return (
    <div className={classes.page}>
      <NavBar button="block" />
      <div className={classes.table}>
        <Typography
          sx={{
            color: "black",
            fontSize: "20px",
            fontWeight: "300",
            fontFamily:"Avenir",
          }}
        >
          Turing Technologies Frontend Test
        </Typography>
        <CallsList />
      </div>
    </div>
  );
}
