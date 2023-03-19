import React from "react";
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
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({

  boxStyle: {
    display: "flex",
    width: "100%",
    marginBottom: "5px",
  },
  textStyle: {
    fontSize: "12px",
    width: "60px",
    fontWeight: "700",
  },

  saveButton: {
    color: "white",
    backgroundColor: "#514EF4",
    border: "none",
    padding: "6px 24px",
    borderRadius: "2px",
    textTransform: "none",
    fontSize: "0.9rem",
    fontWeight: "300",
    width: "100%",
    "&:hover": {
      backgroundColor: "rgba(81, 78, 244, 0.8)",
      cursor: "pointer",
    },
  },
}));

const MyDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function MyDialogTitle(props) {
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
            color: "#514EF4",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

MyDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const NoteDialog = (props) => {
  const classes = useStyles();
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
      <MyDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <MyDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography variant="p">Add Notes</Typography>
          <Typography fontSize={"12px"} fontWeight={"bold"} color="#514EF4">
            Call ID {callID}
          </Typography>
        </MyDialogTitle>
        <DialogContent dividers>
          <Box sx={{ minWidth: "500px", minHeight: "fit-content" }}>
            <Box className={classes.boxStyle}>
              <Typography className={classes.textStyle} >
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
            <Box className={classes.boxStyle}>
            <Typography className={classes.textStyle}>
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
            <Box className={classes.boxStyle}>
            <Typography className={classes.textStyle} >
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
            <Box className={classes.boxStyle}>
            <Typography className={classes.textStyle}>
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
            <Box className={classes.boxStyle}>
              <Typography className={classes.textStyle}>
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
            <Box className={classes.boxStyle}>
            <Typography className={classes.textStyle}
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
            className={classes.saveButton}
            variant="contained"
            onClick={handleAddNewNote}
          >
            Save
          </Button>
        </DialogActions>
      </MyDialog>
    </div>
  );
};
