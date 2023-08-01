import React, { useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { addNotesService, getCallsService } from "../Service/Service";

const CustomModal = ({ open, onClose, rowData, onNoteAdd }) => {
  const [note, setNote] = useState("");

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  //Convert second to time format
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes ${remainingSeconds} seconds`;
  };

  //Called when note is added to call
  const handleSubmit = async (event) => {
    event.preventDefault();
    const jwtToken = Cookies.get("jwt_token");
    await addNotesService(rowData.id, note, jwtToken);
    const updatedData = await getCallsService(0, 100, jwtToken);
    onNoteAdd(updatedData);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        "& .MuiBackdrop-root": { backgroundColor: "transparent" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          border: "1px solid #000",
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">Add Notes</Typography>
        <br />
        <Typography variant="h7">Existing Notes: </Typography>
        <ul>
          {rowData.notes &&
            rowData.notes.map((note) => <li key={note.id}>{note.content}</li>)}
        </ul>
        <p style={{ color: "blue" }}>Call ID {rowData.id}</p>
        <hr />
        <div>
          <p>
            <span style={{ fontWeight: "bold" }}>Call Type</span>{" "}
            {rowData.call_type}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Duration</span>{" "}
            {formatDuration(rowData.duration)}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>From</span> {rowData.from}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>To</span> {rowData.to}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Via</span> {rowData.via}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Notes</span>
          </p>
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Add Notes"
            rows={4}
            cols={50}
            style={{ margin: "5px" }}
          ></textarea>
        </div>
        <hr />
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ width: "100%" }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;
