import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9fafb",
        textAlign: "center",
        padding: 3,
      }}
    >
      <ErrorOutline sx={{ fontSize: 80, color: "#d32f2f", marginBottom: 2 }} />
      <Typography
        variant="h4"
        sx={{
          color: "#333",
          fontWeight: "600",
          fontSize: "2rem",
          marginBottom: 2,
        }}
      >
        Error 404: Page Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#555",
          fontSize: "1.125rem",
          marginBottom: 3,
        }}
      >
        Sorry, the page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          padding: "10px 20px",
          fontSize: "1rem",
          fontWeight: "500",
          borderRadius: "8px",
          textTransform: "none",
          boxShadow: 3,
          "&:hover": {
            backgroundColor: "#1976d2",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          },
        }}
        onClick={() => (window.location.href = "/")}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;
