import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { addNote, getCall } from "@/api/routes";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#5E56FF",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const AddNoteDialog = (props) => {
  const { open, setOpen, callID } = props;

  const [call, setCall] = React.useState({});
  const [newNote, setNewNote] = React.useState("");
  const fetchCall = async () => {
    try {
      const resp = await getCall(callID);
      setCall(resp);
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddNewNote = async () => {
    try {
      const resp = await addNote(callID, newNote);
      setCall(resp);
      setNewNote("");
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    fetchCall();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const minutes = Math.floor(call?.duration / 60);
  const seconds = call?.duration - minutes * 60;

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography variant="p">Add Notes</Typography>
          <Typography fontSize={"12px"} fontWeight={"bold"} color="#5E56FF">
            Call ID {callID}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ minWidth: "500px", minHeight: "fit-content" }}>
            <Box sx={{ display: "flex", width: "100%", marginBottom: "5px" }}>
              <Typography
                sx={{ fontSize: "12px", width: "60px", fontWeight: "bold" }}
              >
                Call Type
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color:
                    call?.call_type === "voicemail"
                      ? "#4F46F8"
                      : call?.call_type === "missed"
                      ? "#C91D3E"
                      : "#23CAB8",
                }}
              >
                {call.call_type === "voicemail"
                  ? "Voice Mail"
                  : call.call_type === "missed"
                  ? "Missed"
                  : "Answered"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", width: "100%", marginBottom: "5px" }}>
              <Typography
                sx={{ fontSize: "12px", width: "60px", fontWeight: "bold" }}
              >
                Duration
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                }}
              >
                {minutes} Minutes {seconds} Seconds
              </Typography>
            </Box>
            <Box sx={{ display: "flex", width: "100%", marginBottom: "5px" }}>
              <Typography
                sx={{ fontSize: "12px", width: "60px", fontWeight: "bold" }}
              >
                From
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                }}
              >
                {call?.from}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", width: "100%", marginBottom: "5px" }}>
              <Typography
                sx={{ fontSize: "12px", width: "60px", fontWeight: "bold" }}
              >
                To
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                }}
              >
                {call?.to}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", width: "100%", marginBottom: "5px" }}>
              <Typography
                sx={{ fontSize: "12px", width: "60px", fontWeight: "bold" }}
              >
                Via
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                }}
              >
                {call?.via}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", width: "100%", marginBottom: "5px" }}>
              <Typography
                sx={{ fontSize: "12px", width: "60px", fontWeight: "bold" }}
              >
                Notes
              </Typography>
            </Box>
            {call?.notes?.map((note, index) => {
              return (
                <Typography fontSize={"12px"} key={note.id}>
                  {index + 1}: {note.content}
                </Typography>
              );
            })}
            <TextField
              sx={{
                marginTop: "10px",
              }}
              fullWidth
              multiline
              rows={3}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              label={"Add note"}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            sx={{
              width: "100%",
            }}
            onClick={handleAddNewNote}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
