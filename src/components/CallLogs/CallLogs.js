import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CallType from "./Components/CallType";
import Duration from "./Components/Duration";
import Archived from "./Components/Archived";
import NotesDialog from "./Components/NotesDialog";
import logo from "../../assets/Group 1.png";
import { convertDate } from "../helperFuntions/convertDate";

const CallLogs = ({ accessToken, baseApi, setAccessToken }) => {
  const [calls, setCalls] = useState(null);
  const [openNotes, setOpenNotes] = useState(false);
  const [select, setSelect] = useState("all");
  const [selectedCall, setSelectedCall] = useState(null); //call when adding notes
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);

  const handleClose = () => {
    setOpenNotes(false);
    setSelectedCall(null);
  };

  useEffect(() => {
    axios
      .get(`${baseApi}/calls`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCalls(res.data.nodes);
        setCount(res.data.totalCount);
      });
  }, []);

  useEffect(() => {
    setData(calls);
  }, [calls]);

  const handlePage = (event, value) => {
    setPage(value);
    axios
      .get(`${baseApi}/calls?offset=${value}&limit=${10}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCalls(res.data.nodes);
        // setCount(res.data.totalCount);
      });
    console.log(value);
  };

  const handleSelect = (val) => {
    let updatedCalls = [];
    setSelect(val);
    if (val === "archived") {
      updatedCalls = calls.filter((item) => item.is_archived === true);
      setData(updatedCalls);
    } else if (val === "unArchived") {
      updatedCalls = calls.filter((item) => item.is_archived === false);
      setData(updatedCalls);
    } else setData(calls);
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} style={{ height: "20px", marginRight: "10px" }} />
          <Typography variant="h6">Turing Technologies</Typography>
        </Box>
        <Button
          variant="contained"
          style={{ textTransform: "none" }}
          onClick={() => setAccessToken(null)}
        >
          Log out
        </Button>
      </Box>
      <Box style={{ padding: "20px" }}>
        <Typography variant="h6" style={{ marginTop: "10px" }}>
          Turing Technologies Frontend Test
        </Typography>
        <Box
          style={{ margin: "10px 0px", display: "flex", alignItems: "center" }}
        >
          <Typography variant="subtitle2" style={{ marginRight: "10px" }}>
            Filter by Status:
          </Typography>
          <Select
            defaultValue={select}
            // native
            // value={department}
            // hidden={true}
            SelectDisplayProps={{
              style: {
                paddingTop: 3,
                paddingBottom: 3,
                fontSize: "12px",
                fontWeight: 500,
              },
            }}
            sx={{
              padding: "0px 0px",
            }}
            onChange={(e) => handleSelect(e.target.value)}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"archived"}>Archived</MenuItem>
            <MenuItem value={"unArchived"}>Unarchived</MenuItem>
          </Select>
        </Box>
        {data ? (
          <TableContainer
            sx={{
              maxHeight: "70vh",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: 0,
                height: 0,
              },
            }}
          >
            <Table
              sx={{
                minWidth: 650,
                "&.MuiTable-root": {
                  //   borderBottom: "transparent",
                  //   boxShadow: "none",
                  border: "transparent",
                },
              }}
              aria-label="simple table"
              style={styles.table}
            >
              <TableHead
                style={{ backgroundColor: "#f4f4f9" }}
                stickyHeader
                // style={{ backgroundColor: "yellow" }}
              >
                <TableRow sx={{ boxShadow: 1 }}>
                  <TableCell>
                    <Typography variant="subtitle2" style={styles.title}>
                      CALL TYPE
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" style={styles.title}>
                      {" "}
                      DIRECTION
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" style={styles.title}>
                      DURATION
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" style={styles.title}>
                      FROM
                    </Typography>
                  </TableCell>{" "}
                  <TableCell>
                    <Typography variant="subtitle2" style={styles.title}>
                      TO
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" style={styles.title}>
                      VIA
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" style={styles.title}>
                      CREATED AT
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" style={styles.title}>
                      STATUS
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" style={styles.title}>
                      ACTIONS
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      boxShadow: 3,
                      // background: getBackgroundColor(row.standings.rank),
                      background: "white",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      <CallType type={item.call_type} />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "#325ae7" }}
                    >
                      {item.direction === "inbound" ? "Inbound" : "Outbound"}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      <Duration timeDuration={item.duration} />
                    </TableCell>{" "}
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      {item.from}
                    </TableCell>{" "}
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      {item.to}
                    </TableCell>{" "}
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      {item.via}
                    </TableCell>{" "}
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      {/* {item.created_at} */}
                      {convertDate(item.created_at)}
                    </TableCell>{" "}
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      <Archived data={item} accessToken={accessToken} />
                    </TableCell>{" "}
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#4f46f8" }}
                        onClick={() => {
                          setOpenNotes(true);
                          setSelectedCall(item);
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          style={{ color: "white", textTransform: "none" }}
                        >
                          Add Note
                        </Typography>
                      </Button>
                    </TableCell>{" "}
                  </TableRow>
                ))}
                {selectedCall ? (
                  <NotesDialog
                    open={openNotes}
                    handleClose={handleClose}
                    selectedCall={selectedCall}
                    accessToken={accessToken}
                  />
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
        {count ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <Pagination
              count={count}
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={handlePage}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default CallLogs;

const styles = {};
