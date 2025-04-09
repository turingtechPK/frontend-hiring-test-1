"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Container,
  Card,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call";
import { useCallById } from "@/features/calls/hooks/useCallById";

import { getCallTypeColor } from "@/helper";
import CallNotes from "../_components/CallNotes";
import CallContent from "../_components/CallContent";

export default function CallDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { call, loading, error } = useCallById(id as string);

  const handleBack = () => {
    router.push("/");
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Paper
          elevation={3}
          sx={{ p: 4, textAlign: "center", bgcolor: "#FFF5F5" }}
        >
          <Typography color="error" variant="h6">
            Error: {error.message}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBack}
            sx={{ mt: 2 }}
          >
            Back to Calls
          </Button>
        </Paper>
      </Container>
    );

  if (!call)
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">No call found</Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBack}
            sx={{ mt: 2 }}
          >
            Back to Calls
          </Button>
        </Paper>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton
          onClick={handleBack}
          sx={{ mr: 2, bgcolor: "#f0f0f0", "&:hover": { bgcolor: "#e0e0e0" } }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="500">
          Call Details
        </Typography>
      </Box>

      <Card elevation={2} sx={{ mb: 4, overflow: "visible" }}>
        <Box
          sx={{
            bgcolor: getCallTypeColor(call.call_type),
            py: 1.5,
            px: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "4px 4px 0 0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CallIcon sx={{ color: "white", mr: 1 }} />
            <Typography
              variant="h6"
              sx={{ color: "white", textTransform: "capitalize" }}
            >
              {call.call_type} Call
            </Typography>
          </Box>
        </Box>

        <CallContent call={call} />
      </Card>

      <CallNotes call={call} />
    </Container>
  );
}
