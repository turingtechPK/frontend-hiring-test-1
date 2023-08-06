import React from "react";
import { Box, Typography } from "@mui/material";
import "./NotFoundPage.css";

const NotFound = () => {
  return (
    <Box>
      <Typography fontWeight="bold" variant="h2">
        404 - Page Not Found
      </Typography>
      <Typography>The page you are looking for does not exist.</Typography>
    </Box>
  );
};

export default NotFound;
