import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  DialogActions,
  Button,
  IconButton,
  TextField,
  colors,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { FetchCall } from "../../common/call";
import { ICall } from "../../common/types";
import { Close } from "@mui/icons-material";
import { SaveNote } from "../../common/note";
import {
  capitalize,
  getTableTextColor,
  secondsToTimeStr,
} from "../../common/func";

export interface CallDialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

const Call = ({ id, open, onClose }: CallDialogProps) => {
  const [callDetails, setCallDetails] = useState<ICall | null>();
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    fetchCallDetails();

    return () => {
      setCallDetails(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCallDetails = async () => {
    const response = await FetchCall(id);
    setCallDetails(response);
  };

  const addNote = async () => {
    await SaveNote(id, noteContent);
    fetchCallDetails();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle borderBottom={0.5} borderColor={colors.grey[300]}>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={8}>
              <Typography variant="h6">Add Notes</Typography>
              <Typography variant="subtitle2" color="primary">
                Call ID {id}
              </Typography>
            </Grid>
            <Grid item container xs={4} justifyContent="flex-end">
              <IconButton color="primary" onClick={() => onClose()}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <Grid container sx={{ pt: 3, paddingLeft: 1, paddingRight: 1 }}>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "bold" }}>Call Type</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography color={getTableTextColor(callDetails?.call_type)}>
                {callDetails?.call_type === "voicemail"
                  ? "Voice Mail"
                  : capitalize(callDetails?.call_type)}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "bold" }}>Duration</Typography>
            </Grid>
            <Grid item xs={9}>
              {secondsToTimeStr(callDetails?.duration)}
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "bold" }}>From</Typography>
            </Grid>
            <Grid item xs={9}>
              {callDetails?.from}
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "bold" }}>To</Typography>
            </Grid>
            <Grid item xs={9}>
              {callDetails?.to}
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "bold" }}>Via</Typography>
            </Grid>
            <Grid item xs={9}>
              {callDetails?.via}
            </Grid>

            <Grid item xs={12} paddingTop={2}>
              <Typography>Notes</Typography>
              <ul>
                {callDetails?.notes?.map((note) => (
                  <li key={note.id}>{note.content}</li>
                ))}
              </ul>
              <TextField
                multiline
                rows={3}
                fullWidth
                placeholder="Add Notes"
                onChange={(e) => setNoteContent(e.currentTarget.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{ borderTop: 0.5, borderColor: colors.grey[300], p: 2 }}
        >
          <Button fullWidth variant="contained" onClick={addNote} sx={{ p: 1 }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Call;
