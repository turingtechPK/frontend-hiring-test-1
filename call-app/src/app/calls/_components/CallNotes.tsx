import { Paper, Typography } from "@mui/material";
import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Call } from "@/types";

interface CallNotesProps {
  call: Call;
}

const CallNotes = ({ call }: CallNotesProps) => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{ mb: 2, display: "flex", alignItems: "center" }}
      >
        <EventNoteIcon sx={{ mr: 1, fontSize: "1.25rem" }} />
        Notes
      </Typography>

      {call.notes.length > 0 ? (
        call.notes.map((note) => (
          <Paper
            key={note.id}
            elevation={1}
            sx={{
              p: 3,
              mb: 2,
              backgroundColor: "#fafafa",
              borderLeft: "4px solid #4F46F8",
              borderRadius: "4px",
            }}
          >
            <Typography variant="body1">{note.content}</Typography>
          </Paper>
        ))
      ) : (
        <Paper
          elevation={1}
          sx={{
            p: 3,
            textAlign: "center",
            backgroundColor: "#fafafa",
            borderRadius: "4px",
          }}
        >
          <Typography color="text.secondary">
            No notes for this call.
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default CallNotes;
