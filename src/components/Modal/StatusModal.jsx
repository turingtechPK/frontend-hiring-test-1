import { useState } from "react";
import PropTypes from 'prop-types';
import  Autocomplete from "@mui/material/Autocomplete";
import  Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import  DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import  IconButton from "@mui/material/IconButton";
import  TextField from "@mui/material/TextField";
import  Typography  from "@mui/material/Typography";
import Spinner from "../UI/Spinner/Spinner";
import { FlexBetween, FlexTextColumn } from "../Flex/Flex";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getCalls, updateCallStatus } from "../../redux/actions/call";
import { toast } from "react-toastify";

const options = [
  {
    label: "Archived",
    value: true
  },
  {
    label: "Unarchive",
    value: false
  }]

const StatusModal = ({ open, setOpen, id, pageNo, pageSize }) => {
  const [status, setStatus] = useState(null);
  const { statusLoading, statusError } = useSelector(state => state.calls);
  const dispatch = useDispatch();

  const statusHandler = () => {
    console.log("Check Status:", status?.value)
    if (!status) {
      toast.error("Please select status value")
      return;
    }
    dispatch(updateCallStatus(id, status?.value));
    if (statusError) {
      toast.error(`${statusError}`)
      return;
    }
    toast.success("Status updated successfully")
    dispatch(getCalls(pageNo, pageSize));
    setOpen(false);
  }

  return (
    <Dialog open={open} fullWidth>
      {statusLoading ? <Spinner /> :
        <>
          <DialogTitle>
            <FlexBetween marginY={1}>

              <FlexTextColumn gap={0.5}>

                <Typography variant="h6">
                  Update Status
                </Typography>

                <Typography fontSize={15} color={"#1565C0"}>
                  Call ID {id}
                </Typography>
              </FlexTextColumn>

              <IconButton onClick={() => setOpen(!open)}>
                <Close sx={{ color: "#1565C0", fontWeight: "bold" }} />
              </IconButton>
            </FlexBetween>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{width:"100%"}}>

            <Autocomplete
              options={options}
              getOptionLabel={option => option.label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              value={status}
              onChange={(event, newValue) => {
                setStatus(newValue)
              }}
              fullWidth
              size="small"
              renderInput={(params) => <TextField {...params} label="Status"  />} />

          </DialogContent>
          <Divider />
          <DialogActions >
            <Box width={"100%"} padding={2}>
              <Button variant="contained" fullWidth size="large" disabled={statusLoading} onClick={statusHandler}>{statusLoading ? "Loading..." : "Update"}</Button>
            </Box>
          </DialogActions>
        </>
      }

    </Dialog>
  );
}

StatusModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  pageNo: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};
export default StatusModal