import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, Divider, TextField } from "@mui/material";
import { addNote } from "../../api/apiUtils";
import { convertToMinutes } from "../../utils";
import { makeStyles } from "@mui/styles";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const useStyles = makeStyles({
  saveBtn: {
    fontSize: 20,
    border: "1px dashed #000000",
    borderColor: "000000",
    backgroundColor: "#4F46F8",
    fontFamily: "Avenir-Normal",
  },
  title: {
    fontWeight: "bold",
  },
});

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
            color: "#4F46F8",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function AddNote({ trigger, onClose, ID, to, from, via, duration, call_type }) {
  // const concatedData = notes.join(', ');

  const myClasses = useStyles();

  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const onSaveNoteHandler = async (event) => {
    event.preventDefault();
    console.log(inputValue);
    addNote(ID, inputValue);
    onClose();
  };
  return trigger ? (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={trigger}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          Add Note
        </BootstrapDialogTitle>
        <Divider />

        <DialogContent>
          <Typography gutterBottom style={{ color: "#4F46F8" }}>
            Caller ID: {ID}
          </Typography>
        </DialogContent>
        <Divider />
        <DialogContent>
          <Typography gutterBottom>
            <span className={myClasses.title}>Call Type </span>{" "}
            <span style={{ color: "#325AE7" }}>{call_type}</span>
          </Typography>
          <Typography gutterBottom>
            <span className={myClasses.title}>Duration</span>{" "}
            <span>{convertToMinutes(duration)} </span>
          </Typography>
          <Typography gutterBottom>
            <span className={myClasses.title}>FROM</span> <span>{from} </span>
          </Typography>
          <Typography gutterBottom>
            <span className={myClasses.title}>TO</span> <span>{to}</span>
          </Typography>
          <Typography gutterBottom>
            <span className={myClasses.title}>VIA</span> <span>{via}</span>
          </Typography>
        </DialogContent>
        <form onSubmit={onSaveNoteHandler}>
          <DialogContent>
            <Typography gutterBottom>
              <span>Notes</span>
            </Typography>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <TextField
                placeholder="Add Notes"
                rows={3}
                InputProps={{ style: { color: "#232323" } }}
                fullWidth
                onChange={handleChange}
                multiline
                id="fullWidth"
              />
            </Box>
          </DialogContent>
          <Divider />
          <DialogContent>
            <Button
              variant="contained"
              sx={{
                borderRadius: 0,
                textTransform: "none",
                marginTop: "10px",
                backgroundColor: "#4F46F8",
              }}
              className={myClasses.saveBtn}
              fullWidth
              autoFocus
              type="submit"
              onClick={onSaveNoteHandler}
            >
              Save
            </Button>
          </DialogContent>
        </form>
      </BootstrapDialog>
    </div>
  ) : (
    ""
  );
}

export default AddNote;
