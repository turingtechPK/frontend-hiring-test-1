import { FlexBetween, FlexRow, FlexTextColumn } from "../Flex/Flex";
import { Close } from "@mui/icons-material";
import PropTypes from 'prop-types';
import InputField from "../UI/InputField/InputField";
import  Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import  DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import  IconButton from "@mui/material/IconButton";
import  Typography  from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCallWithID, updateNotes } from "../../redux/actions/call";
import { toast } from "react-toastify";
import Spinner from "../UI/Spinner/Spinner";
import { convertSecondsToMinutesAndSeconds } from "../../utils/converter";

const NotesModal = ({ open, setOpen, callId }) => {
  const [notes, setNotes] = useState("")
  const dispatch = useDispatch()
  const { call, callIdLoading, callIdError, notesLoading,notesSuccess, notesError  } = useSelector(state => state.calls);
  


  useEffect(() => {
    dispatch(getCallWithID(callId));
    if (callIdError) {
      toast.error(`${callIdError}`)
    }
  }, [dispatch, callId]);

  const saveNotes = () => {
    if (!notes) {
      toast.error("Please provide notes content")
      return;
    }
    dispatch(updateNotes(callId, { content: notes }));
    if (notesError) {
      toast.error(`${notesError}`)
      return;
    }
    if (notesSuccess) {
      toast.success("Notes saved successfully")
    }
    setNotes("")
  }

  const callInfo = [
    {
      title: "Call Type",
      value: call?.call_type,
    },
    {
      title: "Duration",
      value: convertSecondsToMinutesAndSeconds(call?.duration),
    },
    {
      title: "FROM",
      value: call?.from,
    },
    {
      title: "TO",
      value: call?.to,
    },
    {
      title: "VIA",
      value: call?.via,
    },

  ]
  return (
    <Dialog open={open} fullWidth>
      {callIdLoading ? <Spinner /> :
        <>
          <DialogTitle>
            <FlexBetween marginY={1}>
              <FlexTextColumn gap={0.5}>

                <Typography variant="h6">
                  Add Notes
                </Typography>

                <Typography fontSize={15} color={"#1565C0"}>
                  Call ID {callId}
                </Typography>
              </FlexTextColumn>
              <IconButton onClick={() => setOpen(!open)}>
                <Close sx={{ color: "#1565C0", fontWeight: "bold" }} />
              </IconButton>
            </FlexBetween>
          </DialogTitle>
          <Divider />
          <DialogContent >
            {callIdError ? <Typography> Call Records not found</Typography> :
              <>
                <FlexTextColumn padding={2} gap={1}>
                  {callInfo.map((data, index) => {
                    if (data.value === "voicemail") {
                      data.value = "Voice Mail"
                      data.styleValue = { color: "blue" }
                    }
                    else if (data.value === "missed") {
                      data.value = "Missed"
                      data.styleValue = { color: "#C91D3E" }
                    }
                    else if (data.value === "answered") {

                      data.value = "Answered"
                      data.styleValue = { color: "#1DC9B7" }
                    }
                    return (
                      <FlexRow gap={2} key={index} >
                        <Typography sx={{fontWeight:"bold"}} width={100}>{data.title}</Typography>
                        <Typography sx={data.styleValue}>{data.value}</Typography>
                      </FlexRow>
                    )
                  })}

                </FlexTextColumn>
                <Box marginY={2}>
                  <InputField
                    label="Notes"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    multiline={true}
                    rows={3}
                    required={false}
                    type="text"
                    placeholder="Add Notes"
                  />
                </Box>
              </>
            }


          </DialogContent>
          <Divider />
          <DialogActions >
            <Box width={"100%"} padding={2}>
              <Button variant="contained" fullWidth size="large" onClick={saveNotes} disabled={notesLoading}>{notesLoading ? "Loading...": "Save"}</Button>
            </Box>
          </DialogActions>
        </>
      }

    </Dialog>
  );
}

NotesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  callId: PropTypes.string.isRequired,
};

export default NotesModal