import type { ReactNode } from "react";
import { Grid, Box } from "@mui/material";

import { Footer } from "./footer";

interface LayoutProps {
  children: ReactNode;
}

export function AuthLayout(props: LayoutProps): JSX.Element {
  const { children } = props;

  return (
    <Grid
      container
      sx={{
        p: "3rem",
      }}
    >
      <Grid item xs={12}>
        <Box
          sx={{
            m: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
