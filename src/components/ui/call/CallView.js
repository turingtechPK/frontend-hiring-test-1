import React from "react";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { convertToMinutes, formatDate } from "../../../utils";

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
            color: "#4F46F8",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function CallView({
  trigger,
  onClose,
  ID,
  to,
  from,
  created_at,
  direction,
  notes,
  via,
  duration,
  call_type,
  is_archived,
}) {
  console.log(is_archived);
  return trigger ? (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={trigger}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          <span style={{ fontWeight: "bold" }}>Call Details</span>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>Caller ID:</span>{" "}
            <span style={{ color: "#4F46F8" }}>{ID}</span>
          </Typography>
        </DialogContent>

        <DialogContent dividers>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}> Call Type:</span>{" "}
            <span style={{ color: "#325AE7" }}>{call_type}</span>
          </Typography>
        </DialogContent>

        <DialogContent dividers>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>Direction:</span> {direction}
          </Typography>
        </DialogContent>

        <DialogContent dividers>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>Duration:</span>{" "}
            {convertToMinutes(duration)}
          </Typography>
        </DialogContent>

        <DialogContent dividers>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>FROM:</span> {from}
          </Typography>
        </DialogContent>

        <DialogContent dividers>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>TO:</span> {to}
          </Typography>
        </DialogContent>

        <DialogContent dividers>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>VIA:</span> {via}
          </Typography>
        </DialogContent>

        <DialogContent dividers>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>Created At</span>:{" "}
            {formatDate(created_at)}
          </Typography>
        </DialogContent>

        <DialogContent dividers>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold" }}>Archived? </span>{" "}
            {is_archived ? "true" : "false"}
          </Typography>
        </DialogContent>

        <DialogContent dividers>
          <span style={{ fontWeight: "bold" }}>Notes: </span>
          {notes !== undefined && notes !== null
            ? notes.map((item, index) => (
                <Typography gutterBottom key={index}>
                  {item.content}
                </Typography>
              ))
            : ""}
        </DialogContent>
      </BootstrapDialog>
    </div>
  ) : (
    ""
  );
}

export default CallView;
