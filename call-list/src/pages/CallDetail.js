import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { getAccessToken } from "../utils/authUtils";
import { URL } from "../constants";
import { DetailCard, CustomStack } from "../emotionStyle";

const CallDetail = () => {
  const { uuid } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAccessToken()) {
      navigate("/login/");
      return;
    }

    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${getAccessToken()}`,
        };
        const response = await axios.get(`${URL}/calls/${uuid}`, { headers });
        setDetail(response.data);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching call details: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid, navigate]);

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CustomStack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <DetailCard sx={{ width: "50%", margin: "50px" }}>
          <CardMedia sx={{ height: 140 }} image="/phone.png" title="call" />
          {detail ? (
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Call ID: {detail.id}
              </Typography>
              <Typography variant="body2">
                Duration: {detail.duration}
              </Typography>
              <Typography variant="body2">
                Archived: {detail.is_archived ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2">From: {detail.from}</Typography>
              <Typography variant="body2">To: {detail.to}</Typography>
              <Typography variant="body2">
                Direction: {detail.direction}
              </Typography>
              <Typography variant="body2">
                Call Type: {detail.call_type}
              </Typography>
              <Typography variant="body2">
                Created At: {new Date(detail.created_at).toLocaleString()}
              </Typography>
            </CardContent>
          ) : (
            <Typography variant="h6" color="textSecondary">
              Sorry, the call details could not be found.
            </Typography>
          )}
        </DetailCard>
      </CustomStack>
    </Box>
  );
};

export default CallDetail;
