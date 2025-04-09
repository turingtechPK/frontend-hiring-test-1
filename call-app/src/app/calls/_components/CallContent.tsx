import { StatusBadge } from "@/components/StatusBadge";
import {
  Box,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatDuration } from "@/helper";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { format } from "date-fns";
import { Call } from "@/types";

interface CallContentProps {
  call: Call;
}

const CallContent = ({ call }: CallContentProps) => {
  return (
    <>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Call ID: {call.id}
          </Typography>
          <Chip
            label={call.direction}
            size="small"
            sx={{
              textTransform: "capitalize",
              bgcolor: call.direction === "inbound" ? "#E3F2FD" : "#E8F5E9",
              color: call.direction === "inbound" ? "#1565C0" : "#2E7D32",
            }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginRight: 1 }}
            >
              From:
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {call.from}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginRight: 1 }}
            >
              To:
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {call.to}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginRight: 1 }}
            >
              Via:
            </Typography>
            <Typography variant="body1">{call.via}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              component="span"
              sx={{ marginRight: 1 }}
            >
              Status:
            </Typography>
            <StatusBadge isArchived={call.is_archived} callId={call.id} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccessTimeIcon
              sx={{ fontSize: "1rem", mr: 0.5, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary" component="span">
              Duration:
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ ml: 0.5, fontWeight: "500" }}
            >
              {formatDuration(call.duration)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EventNoteIcon
              sx={{ fontSize: "1rem", mr: 0.5, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary" component="span">
              Created at:
            </Typography>
            <Typography variant="body1" component="span" sx={{ ml: 0.5 }}>
              {format(new Date(call.created_at), "PPpp")}
            </Typography>
          </Box>
        </Grid>
      </CardContent>
    </>
  );
};

export default CallContent;
