import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Paper } from "@mui/material";
import { getAccessToken } from "../utils/authUtils";
import { URL } from "../constants";

const AboutMe = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${getAccessToken()}`,
    };
    axios
      .get(`${URL}/me`, { headers: headers })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        setError("Error fetching user data");
        console.error(err);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          width: 400,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          My Profile
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          <strong>Username:</strong> {userData.username}
        </Typography>
        <Typography variant="h6">
          <strong>User ID:</strong> {userData.id}
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutMe;
