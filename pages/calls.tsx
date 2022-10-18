import Banner from "../Modules/Banner";
import TableComponent from "../Modules/TableComponent";
import { withStyles } from "@mui/styles";
import styles from "../styles/Main.module";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Snackbar,
} from "@mui/material";
import Select from "@mui/material/Select";
import { formatDuration } from "../services/date-formatter";
import { call } from "../Interfaces/calls";
import { baseURL, getCallsURL, postNoteURL } from "../config.json";
import axios from "axios";
import { note } from "../Interfaces/note";

const Calls = (props: any) => {
  const { classes } = props;
  const [filterBy, setFilterBy] = useState("");
  const [note, setNote] = useState("");
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState<call>({});
  const [totalCalls, setTotalCalls] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isOpenAddNotesModal, setIsOpenAddNotesModal] = useState(false);
  const [isSuccessAddingNote, setIsSuccessAddingNote] = useState(false);

  const getCalls = () => {
    axios
      .get(baseURL + getCallsURL, {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setCalls(res.data.nodes);
        setTotalCalls(res.data.totalCount);
        setHasNextPage(res.data.hasNextPage);
      });
  };

  useEffect(() => {
    getCalls();
  }, []);

  useEffect(() => {
    if (filterBy !== "" && filterBy === "archived") {
      setFilteredCalls(calls.filter((call: call) => call.is_archived === true));
    } else if (filterBy !== "" && filterBy !== "archived") {
      setFilteredCalls(
        calls.filter((call: call) => call.is_archived === false)
      );
    } else {
      setFilteredCalls(calls);
    }
  }, [filterBy]);

  const handlePaginationChange = (page: number) => {
    axios
      .get(baseURL + getCallsURL + `?offset=${page}&limit=${10}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (filterBy !== "" && filterBy === "archived") {
          setFilteredCalls(
            res.data.nodes.filter((call: call) => call.is_archived === true)
          );
        } else if (filterBy !== "" && filterBy !== "archived") {
          setFilteredCalls(
            res.data.nodes.filter((call: call) => call.is_archived === false)
          );
        } else {
          setFilteredCalls(res.data.nodes);
        }
        setTotalCalls(res.data.totalCount);
        setHasNextPage(res.data.hasNextPage);
      });
  };
  const handleAddNote = (selectedID: string) => {
    setSelectedCall(
      filteredCalls.filter((call: call) => call.id === selectedID)[0]
    );

    setIsOpenAddNotesModal(true);
  };
  const handlePostNote = () => {
    axios
      .post(
        baseURL + getCallsURL + `/${selectedCall.id}` + postNoteURL,
        { content: note },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setIsSuccessAddingNote(true);
        const indexCalls = calls.findIndex(
          (call: call) => call.id === res.data.id
        );
        const indexCallsFiltered = filteredCalls.findIndex(
          (call: call) => call.id === res.data.id
        );
        let newCalls: [call] = calls;
        let newFilteredCalls = filteredCalls;
        newCalls[indexCalls] = res.data;
        newFilteredCalls[indexCallsFiltered] = res.data;
        setCalls(newCalls);
        setFilteredCalls(newFilteredCalls);
        setNote("");
      });
  };

  return (
    <>
      <Banner />
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.header}>
            Turing Technologies Frontend Test
          </div>
        </div>
        <div className={classes.rowFlex}>
          <div className={classes.filterByText}>Filter By</div>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <Select
              sx={{ color: "#2d5ce7" }}
              disableUnderline
              value={filterBy}
              onChange={(e) => {
                setFilterBy(e.target.value);
              }}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"archived"}>Archived</MenuItem>
              <MenuItem value={"unArchived"}>Un Archived</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={classes.row}>
          <TableComponent
            calls={filteredCalls}
            totalCalls={totalCalls}
            hasNextPage={hasNextPage}
            handlePaginationChange={handlePaginationChange}
            handleAddNote={handleAddNote}
          />
        </div>
        <Dialog open={isOpenAddNotesModal}>
          <DialogTitle>
            <>
              <div>Add Notes</div>
              <div className={classes.blueText}>Call ID {selectedCall.id}</div>
            </>
          </DialogTitle>
          <DialogContent>
            <>
              <div className={classes.dialogRow}>
                <div>Call Type</div>
                <div>{selectedCall.call_type}</div>
              </div>
              <div className={classes.dialogRow}>
                <div>Duration</div>
                <div>{formatDuration(selectedCall.duration)}</div>
              </div>
              <div className={classes.dialogRow}>
                {" "}
                <div>From</div>
                <div>{selectedCall.from}</div>
              </div>
              <div className={classes.dialogRow}>
                <div> To </div>
                <div>{selectedCall.to}</div>
              </div>
              <div className={classes.dialogRow}>
                {" "}
                <div> Via </div>
                <div>{selectedCall.via}</div>
              </div>

              <div className={classes.dialogRow}>Notes</div>

              {selectedCall.notes?.map((note: note) => {
                return (
                  <div className={classes.dialogRow} key={note.id}>
                    {note.content}
                  </div>
                );
              })}
              {/* {selectedCall.notes?.length === 0 ? (
                <div className={classes.dialogRow}>
                  <div className={classes.orangeText}>No Notes</div>
                </div>
              ) : (
                <></>
              )} */}
              <div className={classes.dialogRow}>
                <textarea
                  type={"area"}
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
              </div>
            </>
          </DialogContent>
          <DialogActions>
            <div
              className={classes.extendedBtn}
              onClick={() => {
                setIsOpenAddNotesModal(false);
                handlePostNote();
              }}
            >
              Save
            </div>
            <div
              className={classes.extendedBtn}
              onClick={() => {
                setIsOpenAddNotesModal(false);
              }}
            >
              Close
            </div>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={isSuccessAddingNote}
          autoHideDuration={6000}
          onClose={() => {
            setIsSuccessAddingNote(false);
          }}
          message="Posting Notes Success"
          action={() => {
            setIsSuccessAddingNote(false);
          }}
        />
      </div>
    </>
  );
};

export default withStyles(styles)(Calls);
