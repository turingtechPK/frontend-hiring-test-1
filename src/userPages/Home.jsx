import React, { useState, useEffect } from "react";

//components
import PhoneTable from "../components/PhoneTable";

//mui
import NativeSelect from "@mui/material/NativeSelect";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
//api
import {
  getCalls,
  getCallsCustom,
  changeStatus,
  addNote,
} from "../utilities/api";

const Home = () => {
  const [filter, setFilter] = useState();
  const [callData, setCallData] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [archivedData, setArchived] = useState({});
  const [noteCall, setNoteCall] = useState({});
  const [noteArea, setNoteArea] = useState();
  const [open, setOpen] = useState(false);
  const style = {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const handleCalls = async () => {
    let response = await getCalls();
    setTotalCount(response.data.totalCount);
    let minutes;
    let remainingSeconds;
    let seconds;
    let temp = response.data.nodes.map((call) => {
      const { duration, ...rest } = call;
      seconds = call.duration;
      minutes = Math.floor(seconds / 60);
      remainingSeconds = seconds % 60;
      return {
        ...rest, // Spread the rest of the properties
        duration: {
          minutes: minutes,
          seconds: remainingSeconds,
          originalDuration: seconds,
        },
      };
    });

    setCallData([...temp]);
  };

  const handleCustomCalls = async (e, page) => {
    let response = await getCallsCustom(page * 10);
    setTotalCount(response.data.totalCount);
    let minutes;
    let remainingSeconds;
    let seconds;
    let temp = response.data.nodes.map((call) => {
      const { duration, ...rest } = call;
      seconds = call.duration;
      minutes = Math.floor(seconds / 60);
      remainingSeconds = seconds % 60;
      return {
        ...rest, // Spread the rest of the properties
        duration: {
          minutes: minutes,
          seconds: remainingSeconds,
          originalDuration: seconds,
        },
      };
    });

    setCallData([...temp]);
  };
  const handleArchive = async (id) => {
    let response = await changeStatus(id);
    let originalDuration = response.data.duration;
    let minutes = Math.floor(originalDuration / 60);
    let seconds = originalDuration % 60;

    response.data.duration = { minutes, seconds, originalDuration };

    setArchived({ ...response.data });
    setCallData((prevData) => {
      const index = prevData.findIndex((call) => call.id === id);
      if (index !== -1) {
        const updatedCallData = [...prevData];
        updatedCallData.splice(index, 1, {
          ...response.data,
        });
        return updatedCallData;
      }
      return prevData;
    });
  };

  const handleModal = (call) => {
    setNoteCall({ ...call });
    setOpen(true);
  };
  const handleNoteSave = async () => {
    const response = await addNote(noteCall.id, noteArea);

    let originalDuration = response.data.duration;
    let minutes = Math.floor(originalDuration / 60);
    let seconds = originalDuration % 60;

    response.data.duration = { minutes, seconds, originalDuration };

    setCallData((prevData) => {
      const index = prevData.findIndex((call) => call.id === noteCall.id);
      if (index !== -1) {
        const updatedCallData = [...prevData];
        updatedCallData.splice(index, 1, {
          ...response.data,
        });
        return updatedCallData;
      }
      return prevData;
    });

    handleClose();
  };
  useEffect(() => {
    handleCalls();
  }, []);

  return (
    <div id="home">
      <p id="mainp">Turing Technologies Frontend Test</p>
      <span id="filterSpan">
        <p id="subp">Filter by: </p>

        <NativeSelect
          id="dropdown"
          /*     defaultValue="Status" */
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
          value={filter}
          handleChange={handleChange}
        >
          <option value={10}>Status</option>
          <option value={20}>Missed</option>
        </NativeSelect>
      </span>
      <PhoneTable
        callData={callData}
        handleArchive={handleArchive}
        handleModal={handleModal}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="box" sx={style}>
          <div id="crossDiv">
            <p>Add Notes</p>
            <CloseIcon onClick={handleClose} />
          </div>
          <p id="pid">Call ID ${noteCall.id}</p>
          <div className="hr"></div>
          <div className="bothDiv">
            <p className="bothDivp1">Call Type</p>
            <p
              style={{
                color: "#325ae7",
              }}
              className="bothDivp2"
            >
              {noteCall.call_type}
            </p>
          </div>
          <div className="bothDiv">
            <p className="bothDivp1">Duration</p>
            <p className="bothDivp2">
              {noteCall.duration && noteCall.duration.minutes} minutes{" "}
              {noteCall.duration && noteCall.duration.seconds} seconds
            </p>
          </div>
          <div className="bothDiv">
            <p className="bothDivp1">From</p>
            <p className="bothDivp2">{noteCall.from}</p>
          </div>
          <div className="bothDiv">
            <p className="bothDivp1">To</p>
            <p className="bothDivp2">{noteCall.to}</p>
          </div>
          <div className="bothDiv">
            <p className="bothDivp1">Via</p>
            <p className="bothDivp2">{noteCall.via}</p>
          </div>
          <p
            style={{
              marginTop: "20px",
            }}
            className="bothDivp1"
          >
            Notes
          </p>
          <textarea
            id="notearea"
            name="notearea"
            rows="8"
            placeholder="Add Notes"
            value={noteArea}
            onChange={(e) => setNoteArea(e.target.value)}
          ></textarea>
          <div className="hr"></div>
          <Button onClick={handleNoteSave} id="savebtn" variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
      <Pagination
        onChange={handleCustomCalls}
        id="pagination"
        count={Math.floor(totalCount / 10)}
        color="primary"
        shape="rounded"
      />
    </div>
  );
};

export default Home;
