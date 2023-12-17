"use client";

import { useSession } from "next-auth/react";
import ApiData from "./table";
import { Typography } from "@mui/material";

const Home = () => {
  const { data: session } = useSession();
  console.log("Token is : ", session?.user.access_token);
  console.log("Refresh is : ", session?.user.refresh_token);

  const refreshToken = session?.user.refresh_token;

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    console.error("Refresh token is undefined.");
  }

  return (
    <>
      <Typography fontSize="1.5rem" marginTop="20px" marginLeft="1.5em">
        Turing Technologies Frontend Test
      </Typography>
      <ApiData />
    </>
  );
};

export default Home;
