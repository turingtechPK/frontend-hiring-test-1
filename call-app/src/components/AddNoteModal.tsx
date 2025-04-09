import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Typography,
  Divider,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import { useCallById } from "@/features/calls/hooks/useCallById";
import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "@/features/calls/graphql/calls";
import CloseIcon from "@mui/icons-material/Close";
import { formatDuration, getCallTypeColor } from "@/helper";

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
  callId: string;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  open,
  onClose,
  callId,
}) => {
  const { call, loading, error } = useCallById(callId);
  const [addNote] = useMutation(ADD_NOTE);
  const [noteContent, setNoteContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleAddNote = async () => {
    if (!noteContent.trim()) {
      onClose();
      return;
    }

    setIsSaving(true);
    try {
      await addNote({
        variables: {
          input: {
            activityId: callId,
            content: noteContent,
          },
        },
      });

      setNoteContent("");
      onClose();
    } catch (err) {
      console.error("Error adding note:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogContent>
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogContent>
          <Typography color="error">Error: {error.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (!call) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogContent>
          <Typography>No call found</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: 600 }}>Add Notes</p>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: 3, paddingBottom: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 500, color: "#4F46F8" }}>
          <strong>Call ID:</strong> {callId}
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box
          display="flex"
          flexDirection="column"
          gridTemplateColumns="1fr 1fr"
          gap={1}
          mb={2}
        >
          <Typography>
            <strong>Call Type:</strong>{" "}
            <span
              style={{
                color: getCallTypeColor(call.call_type),
                textTransform: "capitalize",
              }}
            >
              {call.call_type}
            </span>
          </Typography>
          <Typography>
            <strong>Duration:</strong> {formatDuration(call.duration)}
          </Typography>
          <Typography>
            <strong>From:</strong> {call.from}
          </Typography>
          <Typography>
            <strong>To:</strong> {call.to}
          </Typography>
          <Typography>
            <strong>Via:</strong> {call.via}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <p style={{ fontSize: "20px", fontWeight: 600, marginBottom: "4px" }}>
          Notes
        </p>

        <TextField
          label="Add Note..."
          multiline
          rows={6}
          fullWidth
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          sx={{
            "& label.Mui-focused": {
              color: "#5071EA",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#5071EA",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5071EA",
              },
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleAddNote}
          sx={{
            backgroundColor: "#4F46F8",
            color: "white",
            width: "100%",
            padding: "10px 0px",
            position: "relative",
          }}
          variant="contained"
          disabled={isSaving}
        >
          {isSaving ? (
            <CircularProgress
              size={20}
              sx={{
                color: "white",
              }}
            />
          ) : (
            "Save"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNoteModal;
