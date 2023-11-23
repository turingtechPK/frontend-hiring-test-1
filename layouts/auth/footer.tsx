import React from "react";
import { Typography, Box } from "@mui/material";

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        sx={{ color: "text.secondary" }}
        component="span"
        variant="body2"
      >
        Copyrights © {currentYear} All Rights Reserved by{" "}
        <strong>Turning Technology</strong>
      </Typography>
    </Box>
  );
}
