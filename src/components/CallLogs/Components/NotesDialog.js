import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
import close from "../../../assets/close.png";
import CallType from "./CallType";
import Duration from "./Duration";

const NotesDialog = ({ open, handleClose, selectedCall, accessToken }) => {
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (note.length !== 0) {
      console.log("id", selectedCall.id);
      axios
        .post(
          `https://frontend-test-api.aircall.io/calls/:${selectedCall.id}/note`,
          {
            content: note,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(() => handleClose);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Box style={styles.dialog}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 20px",
          }}
        >
          <Box>
            <Typography variant="subtitle2" style={styles.title}>
              Add Notes
            </Typography>
            <Typography variant="subtitle2" style={styles.id}>
              Call ID {selectedCall.id}
            </Typography>
          </Box>
          <img src={close} style={styles.img} onClick={handleClose} />
        </Box>
        <Divider />
        <DialogContent>
          <Box style={{ display: "flex" }}>
            <Box style={{ marginLeft: "5px" }}>
              <Typography variant="subtitle2" style={styles.text}>
                Call Type
              </Typography>
              <Typography variant="subtitle2" style={styles.text}>
                Duration
              </Typography>
              <Typography variant="subtitle2" style={styles.text}>
                FROM
              </Typography>
              <Typography variant="subtitle2" style={styles.text}>
                TO
              </Typography>
              <Typography variant="subtitle2" style={styles.text}>
                VIA
              </Typography>
            </Box>
            <Box style={{ marginLeft: "20px" }}>
              <Typography variant="subtitle2" style={styles.text}>
                <CallType type={selectedCall.call_type} />
              </Typography>
              <Typography variant="subtitle2" style={styles.text}>
                <Duration
                  timeDuration={selectedCall.duration}
                  component="notes"
                />
              </Typography>
              <Typography variant="subtitle2" style={styles.text}>
                {selectedCall.from}
              </Typography>
              <Typography variant="subtitle2" style={styles.text}>
                {selectedCall.to}
              </Typography>
              <Typography variant="subtitle2" style={styles.text}>
                {selectedCall.via}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              style={styles.text}
              sx={{ marginBottom: "0px" }}
            >
              Notes
            </Typography>
            <TextField
              fullWidth
              multiline
              value={note}
              rows={4}
              placeholder="Add Notes"
              style={styles.textfield}
              onChange={(e) => setNote(e.target.value)}
            />
          </Box>
        </DialogContent>
        <Divider />
        <DialogContent>
          <Button style={styles.btn} variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default NotesDialog;

const styles = {
  dialog: {
    paddingBottom: "20px",
  },
  title: {
    fontWeight: 500,
    fontSize: "18px",
  },
  img: {
    height: "20px",
    // position: "relative",
    // top: "10px",
  },
  id: {
    color: "#4f46f8",
  },
  content: {
    display: "flex",
  },
  text: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  btn: {
    width: "100%",
    // display: "flex",
    // marginLeft: "auto",
    // marginRight: "auto",
    textTransform: "none",
    marginTop: "20px",
  },
};
