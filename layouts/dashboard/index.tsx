import type { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import { Box, Stack } from "@mui/material";
import { AuthInitializer } from "@hoc/with-auth-initializer";

export function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <AuthInitializer>
      <Stack sx={{ minHeight: "100vh" }}>
        <Header />
        <Box sx={{ px: 8, py: 3, mt: "10rem" }} flex="1">
          {children}
        </Box>
        <Footer />
      </Stack>
    </AuthInitializer>
  );
}
