import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Box } from "@mui/system";
import { LoginForm } from "@/components/LoginForm";
export default function SignIn() {
  return (
    <Box
      sx={{
        backgroundColor: "#F3ECEC",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <LoginForm />
    </Box>
  );
}

SignIn.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
