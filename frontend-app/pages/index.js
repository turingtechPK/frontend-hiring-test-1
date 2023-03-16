import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "@/components/navbars/Navbar";
import { Box, Typography } from "@mui/material";
import { CallsTable } from "@/components/CallsTable";
import { refreshToken } from "@/api/routes";

export default function Home() {
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
    <>
      <Box
        sx={{
          padding: "30px",
        }}
      >
        <Typography variant="h5">Turing Technologies Frontend Test</Typography>
        <CallsTable />
      </Box>
    </>
  );
}
