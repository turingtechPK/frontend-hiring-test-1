import React from "react";
import { Typography, Box } from "@mui/material";

function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={(theme) => ({
        textAlign: "center",
        boxShadow: theme.shadows[5],
        backgroundColor: "background.paper",
        py: 1.8,
      })}
    >
      <Typography
        sx={{ color: "text.secondary" }}
        component="span"
        variant="body2"
      >
        Copyrights © {currentYear} All Rights Reserved by{" "}
        <strong>Turing Technologies</strong>
      </Typography>
    </Box>
  );
}

export default Footer;
