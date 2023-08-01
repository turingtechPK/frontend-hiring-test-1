import React from "react";
import { Button } from "@mui/material";
import Cookies from "js-cookie";

export default function Logout() {
  //Removes cookie and redirects to login
  const handleLogout = () => {
    Cookies.remove("jwt_token");
    window.location.href = "/";
  };

  return (
    <>
      <Button
        variant="contained"
        style={{ background: "#4f46f8" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
}
