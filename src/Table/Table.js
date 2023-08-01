import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Paper, TableContainer } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Cookies from "js-cookie";
import { getCallsService, addArchiveService } from "../Service/Service";
import CustomModal from "../Modal/Modal";
import "./Table.css";

const styleMap = {
  voicemail: { color: "blue" },
  answered: { color: "#6eccaf" },
  missed: { color: "#c51605" },
};

const styles = {
  notesButton: {
    backgroundColor: "#4f46f8",
    padding: "3px",
    borderRadius: "2px",
    color: "white",
    fontSize: "10px",
    textTransform: "none",
  },
};

export default function BasicTable({ status }) {
  const [callData, setCallData] = useState([]);
  const [offSet, setOffSet] = useState(0);

  const [open, setOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState([]);

  //When modal is opned
  const handleOpen = (rowData) => {
    setSelectedRowData(rowData);
    setOpen(true);
  };

  //When modal is closed
  const handleClose = () => setOpen(false);

  //Called for fetching data from API
  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    let isMounted = true;
    getCallsService(offSet, 100, jwtToken).then((items) => {
      if (isMounted) {
        setCallData(items.data.nodes);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [offSet]);

  //Sets received data to rows
  const rows = callData.map((call) => ({
    call_type: call.call_type,
    created_at: call.created_at,
    direction: call.direction,
    duration: call.duration,
    from: call.from,
    id: call.id,
    is_archived: call.is_archived,
    notes: call.notes,
    to: call.to,
    via: call.via,
  }));

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let filteredRows = [];

  //Filtering rows
  if (status == "Archived") {
    filteredRows = rows.filter((row) => row.is_archived === true);
  } else if (status == "Unarchive") {
    filteredRows = rows.filter((row) => row.is_archived === false);
  } else if (status == "Status" || status == "") {
    filteredRows = rows;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the starting index and ending index of the current page
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Get the current page data
  const currentPageData = filteredRows.slice(startIndex, endIndex);

  //Convert second to time format
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes ${remainingSeconds} seconds`;
  };

  //Changes data format to DD-MM-YYYY
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1 to get the correct month number
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
  };

  //Called when call is being archive or unarchive
  const handleArchiveClick = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    try {
      await addArchiveService(id, jwtToken);
      const updatedData = await getCallsService(offSet, 100, jwtToken);
      setCallData(updatedData.data.nodes);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle the data update after adding the note
  const handleDataUpdate = (updatedData) => {
    setCallData(updatedData.data.nodes);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, border: "1px solid #dadada" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ background: "#eaeaea" }}>
              <TableCell sx={{ fontWeight: "bold" }}>CALL TYPE</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                DIRECTION
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                DURATION
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                FROM
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                TO
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                VIA
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                CREATED AT
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                STATUS
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={styleMap[row.call_type] || {}}
                >
                  {row.call_type}
                </TableCell>
                <TableCell align="left" sx={{ color: "blue" }}>
                  {row.direction}
                </TableCell>
                <TableCell align="left">
                  {formatDuration(row.duration)}
                  <br />
                  <span style={{ color: "blue" }}>
                    ({row.duration} seconds)
                  </span>
                </TableCell>
                <TableCell align="left">{row.from}</TableCell>
                <TableCell align="left">{row.to}</TableCell>
                <TableCell align="left">{row.via}</TableCell>
                <TableCell align="left">
                  {formatCreatedAt(row.created_at)}
                </TableCell>
                <TableCell align="left">
                  <div onClick={() => handleArchiveClick(row.id)}>
                    <span
                      className={
                        row.is_archived === true
                          ? "statusoption1"
                          : "statusoption2"
                      }
                    >
                      {row.is_archived ? "Archived" : "Unarchive"}
                    </span>
                  </div>
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="text"
                    size="small"
                    sx={styles.notesButton}
                    onClick={() => handleOpen(row)}
                  >
                    Add Note
                  </Button>
                  <CustomModal
                    open={open}
                    onClose={handleClose}
                    rowData={selectedRowData}
                    onNoteAdd={handleDataUpdate}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} p={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)} // Calculate the total number of pages
          page={page}
          onChange={handleChangePage}
          shape="rounded"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "blue",
              color: "white",
            },
          }}
        />
      </Box>
    </>
  );
}
