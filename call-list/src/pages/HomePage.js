import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BasicTable from "../components/Table";
import { URL } from "../constants";
import { getAccessToken } from "../utils/authUtils";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";

const Calls = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!getAccessToken()) {
        navigate("/login/");
        return;
      }

      const headers = {
        Authorization: `Bearer ${getAccessToken()}`,
      };

      try {
        const response = await axios.get(`${URL}/calls`, { headers });
        setCalls(response.data.nodes || []);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      {calls.length > 0 ? (
        <BasicTable nodes={calls} />
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
          No calls available.
        </Typography>
      )}
    </Box>
  );
};

export default Calls;
