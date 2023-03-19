import React from "react";
import { Box } from "@mui/system";
import SigninForm  from "@/components/SigninForm";
import NavBar from "@/components/NavBar";
export default function SignIn() {
  return (
    <div>
      <NavBar button="none" />
      <Box
        sx={{
          backgroundColor: "#f4eeee",
          height: "100vh",
          justifyContent: "center",
          display: "flex",
        }}>
        <SigninForm />
      </Box>
    </div>
  );
}
