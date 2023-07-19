import React, { useLayoutEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { archiveCall, getData } from "../../../api/apiUtils";
import { Button } from "@mui/material";
import {
  capitalizeFirstLetters,
  convertToMinutes,
  findTotalPages,
  formatDate,
} from "../../../utils";
import PaginationList from "../pagination/PaginationList";
import { makeStyles } from "@mui/styles";
import AddNote from "../../note/AddNote";
import CallView from "../../ui/call/CallView";
import TableHeaders from "./TableHeaders";

export default function CallsTable() {
  const useStyles = makeStyles({
    tableContainer: {
      border: "1px solid #CBD6E2",
    },
    table: {
      alignSelf: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    tableText: {
      fontFamily: "Avenir-Roman",
      fontSize: "16px",

      lineHeight: "24px",
      fontStyle: "normal",
      textAlign: "center",
    },
    notesBtn: {
      height: "32px",
      width: "100px",
      borderColor: "#000000",
      borderWidth: "1px",
      borderStyle: "dashed",
      backgroundColor: "#4f46f8",
      fontFamily: "Avenir-Normal",

      fontStyle: "normal",
      textAlign: "center",
      color: "#ffffff",
    },
    archiveBtn: {
      height: "32px",
      width: "100px",
      border: "none",
      boxShadow: "none",
      fontFamily: "Avenir-Normal",

      fontStyle: "normal",
      textAlign: "center",
      color: "#ffffff",
      textTransform: "none",
    },
    hoverable: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    },
  });

  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(9);
  const [totalPages, setNumberOfPageNumber] = useState(10);
  const [notesButtonTrigger, setNotesButtonTrigger] = useState(false);
  const [callViewTrigger, setCallViewTrigger] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // const [filterValue, setFilterValue] = useState("");

  // const handleFilterChange = (event) => {
  //   setFilterValue(event.target.value);
  // };

  // const filteredData = filterValue
  //   ? data.filter((item) => item.is_archived === filterValue)
  //   : data;
  // console.log(filteredData);
  // const categories = [...new Set(data.map((item) => item.is_archived))];
  // console.log(categories);

  async function fetchData() {
    const calls = await getData(page, 10);
    console.log(calls[1]);

    setData(JSON.parse(calls[0]));
    setTotalCount(calls[1]);

    setNumberOfPageNumber(findTotalPages(calls[1]));
  }

  const onNotesViewCloseHandler = () => {
    setNotesButtonTrigger(false);
  };

  const onArchiveHandler = async (row) => {
    if (row.is_archived) {
      await archiveCall(row.id, false);
    } else {
      await archiveCall(row.id, true);
    }

    setTimeout(() => {
      fetchData();
    }, 1000);
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [page, notesButtonTrigger, callViewTrigger]);

  const rowClickHandler = () => {
    setCallViewTrigger(false);
  };

  const classes = useStyles();
  return (
    <>
      {/* <Filter options={categories} value={filterValue} onChange={handleFilterChange}/> */}
      <p>Filter by: Placeholder</p>
      <TableContainer className={[classes.table]}>
        <Table sx={{ minWidth: 650 }} className={classes.tableContainer}>
          <TableHeaders />
          <TableBody>
            {data !== []
              ? data.map((row) => (
                  <TableRow
                    onDoubleClick={(rowData) => {
                      if (!rowData.target.matches("button")) {
                        setSelectedItem(row);
                        setCallViewTrigger(true);
                      }
                    }}
                    key={row.id}
                    className={classes.hoverable}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      className={classes.tableText}
                      style={{
                        color:
                          row.call_type === "answered"
                            ? "#1dc9b7"
                            : row.call_type === "voicemail"
                            ? "#325ae7"
                            : "#c91d3e",
                      }}
                      component="th"
                      scope="row"
                    >
                      {capitalizeFirstLetters(row.call_type)}
                    </TableCell>
                    <TableCell
                      style={{ color: "#325ae7" }}
                      className={classes.tableText}
                      align="center"
                    >
                      {capitalizeFirstLetters(row.direction)}
                    </TableCell>
                    <TableCell className={classes.tableText} align="center">
                      <span>{convertToMinutes(row.duration)}</span>
                      <br />
                      <span style={{ color: "#325ae7" }}>
                        ({row.duration} seconds)
                      </span>
                    </TableCell>
                    <TableCell className={classes.tableText} align="center">
                      {row.from}
                    </TableCell>
                    <TableCell className={classes.tableText} align="center">
                      {row.to}
                    </TableCell>
                    <TableCell className={classes.tableText} a align="center">
                      {row.via}
                    </TableCell>
                    <TableCell className={classes.tableText} align="center">
                      {formatDate(row.created_at)}
                    </TableCell>
                    {row.isArchived ? (
                      <TableCell className={classes.tableText} align="center">
                        <Button
                          variant="contained"
                          sx={{
                            borderRadius: 0,
                            textTransform: "none",
                          }}
                          className={classes.archiveBtn}
                        >
                          Archived
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell className={classes.tableText} align="center">
                        <Button
                          style={{
                            background: row.is_archived
                              ? "rgba(29,201,183,0.08 )"
                              : "rgba(114,114,114,0.12 )",
                            color: row.is_archived ? "#1dc9b7" : "#727272",
                            boxShadow: "none",
                          }}
                          onClick={() => onArchiveHandler(row)}
                          variant="contained"
                          sx={{
                            borderRadius: 0,
                            textTransform: "none",
                          }}
                          className={classes.archiveBtn}
                        >
                          {row.is_archived ? "Unarchive" : "Archive"}
                        </Button>
                      </TableCell>
                    )}
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          setSelectedItem(row);
                          setNotesButtonTrigger(true);
                        }}
                        variant="contained"
                        sx={{
                          borderRadius: 0,
                          textTransform: "none",
                          backgroundColor: "#4f46f8",
                        }}
                        className={classes.notesBtn}
                      >
                        {"Add Note"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>

        {
          //Displays the Note PopUp conditionally
          selectedItem ? (
            <AddNote
              trigger={notesButtonTrigger}
              onClose={onNotesViewCloseHandler}
              ID={selectedItem.id}
              to={selectedItem.to}
              from={selectedItem.from}
              via={selectedItem.via}
              duration={selectedItem.duration}
              call_type={selectedItem.call_type}
            />
          ) : (
            ""
          )
        }

        {
          //Displays the Call View conditionall
          selectedItem ? (
            <CallView
              trigger={callViewTrigger}
              onClose={rowClickHandler}
              ID={selectedItem.id}
              to={selectedItem.to}
              from={selectedItem.from}
              notes={selectedItem.notes}
              via={selectedItem.via}
              duration={selectedItem.duration}
              direction={selectedItem.direction}
              call_type={selectedItem.call_type}
              created_at={selectedItem.created_at}
              is_archived={selectedItem.is_archived}
            />
          ) : (
            ""
          )
        }
      </TableContainer>

      <PaginationList
        totalCount={totalCount}
        setPage={setPage}
        pageNumber={totalPages}
      />
    </>
  );
}
