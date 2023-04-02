import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CallStateRaw, NoteStateRaw } from "../state/types";
import { toSentenceCase } from "../utils/helpers";
import { createNote } from "../state/ducks/calls/callActions";

interface AddNoteModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  data: CallStateRaw;
  createNote: (text:String, id:String) => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  visible,
  onClose,
  data,
}) => {
    const [text, setText] = useState<String>('')
  return (
    <Dialog
      open={visible}
      onClose={onClose}
      maxWidth="md"
      fullWidth={false}
      PaperProps={{
        style: {
          width: "500px",
          // height: '700px',
          borderRadius: "8px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingX: "20px",
          paddingTop: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Add Note
        </Typography>

        <IconButton
          edge="end"
          sx={{ color: "#355CE7" }}
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography
        variant="body1"
        color="#355CE7"
        sx={{ paddingLeft: "20px", marginBottom: "15px" }}
      >
        Call ID: {data?.id}
      </Typography>
      <Divider />
      <DialogContent>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="body1" sx={{ marginBottom: ".5rem" }}>
            Call Type:{" "}
            <span style={{ color: "#355CE7" }}>
              {toSentenceCase(data?.call_type)}
            </span>
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: ".5rem" }}>
            Duration: {data?.duration.toString()}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: ".5rem" }}>
            From: {data?.from}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: ".5rem" }}>
            To: {data?.to}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: ".5rem" }}>
            Via: {data?.via}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ marginBottom: "8px" }}>
          Notes:
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          label="Add Notes"
          sx={{ marginBottom: "16px" }}
          onChange={(e)=>{setText(e.target.value)}}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#4F46F8" }}
          onClick={()=>{
            console.log('save')
            createNote(text, data.id)
        }}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteModal;
