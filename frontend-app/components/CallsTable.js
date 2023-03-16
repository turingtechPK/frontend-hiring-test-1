import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Pagination,
  CircularProgress,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getCalls, toggleArchive } from "@/api/routes";
import { AddNoteDialog } from "./dialogs/AddNoteDialog";
const styles = {
  tableHeadCell: {
    fontSize: "12px",
    fontWeight: "700",
    border: "none",
    backgroundColor: "#F4F4F9",
    padding: "10px 16px",
  },
  tableBodyCell: {
    padding: "12px 16px",
  },
  tableCellRow: {
    fontSize: "12px",
    padding: "10px 16px",
  },
};
export const CallsTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(1);
  const [rows, setRows] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currOffset, setCurrOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  //Filter Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeFilter = (value) => {
    setFilter(value);
    handleClose();
  };

  const fetchRows = async (offset = 0) => {
    setIsLoading(true);
    try {
      const calls = await getCalls(offset, limit);
      setRows(calls?.nodes || []);
      setHasNextPage(calls?.hasNextPage);
      setCount(Math.ceil(calls?.totalCount / limit));
      setTotalCount(calls?.totalCount);
      console.log(calls);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchRows();
  }, []);

  const handleChangePage = (e, newPage) => {
    fetchRows((newPage - 1) * limit);
    setCurrOffset((newPage - 1) * limit);
  };
  const filteredRows = useMemo(() => {
    if (filter === null) {
      return rows;
    } else if (filter === true) {
      return rows?.filter((row) => row.is_archived);
    } else {
      return rows?.filter((row) => row.is_archived === false);
    }
  }, [filter, rows]);

  return (
    <Box>
      <Box sx={{ display: "flex", marginTop: "10px", alignItems: "center" }}>
        <Typography
          sx={{
            color: "darkgrey",
            fontSize: "12px",
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          Filter By:{" "}
        </Typography>
        <Box>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            sx={{
              textTransform: "none",
            }}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon size="small" />}
          >
            Status
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleChangeFilter(null)}>All</MenuItem>
            <MenuItem onClick={() => handleChangeFilter(true)}>
              Archived
            </MenuItem>
            <MenuItem onClick={() => handleChangeFilter(false)}>
              Unarchived
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box sx={{ minWidth: 400, maxHeight: "430px" }}>
        <Box
          sx={{
            margin: "20px 0px",
            border: "1px solid #D4D3D3",
            borderRadius: "5px",
            borderBottom: "none",
            padding: "1px",
          }}
        >
          <Table
            sx={{
              height: "max-content",
            }}
            stickyHeader
          >
            <TableHead sx={{ border: "none" }}>
              <TableRow
                sx={{
                  fontSize: "14px",
                }}
              >
                <TableCell sx={styles.tableHeadCell}>CALL TYPE</TableCell>
                <TableCell sx={styles.tableHeadCell}>DIRECTION</TableCell>
                <TableCell sx={styles.tableHeadCell}>DURATION</TableCell>
                <TableCell sx={styles.tableHeadCell}>FROM</TableCell>
                <TableCell sx={styles.tableHeadCell}>TO</TableCell>
                <TableCell sx={styles.tableHeadCell}>VIA</TableCell>
                <TableCell sx={styles.tableHeadCell}>CREATED AT</TableCell>
                <TableCell sx={styles.tableHeadCell}>STATUS</TableCell>
                <TableCell sx={styles.tableHeadCell}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                filteredRows?.map((row, index) => {
                  return <TableRowComponent key={row?.id} row={row} />;
                })
              ) : (
                <TableRow
                  sx={{
                    width: "100%",
                  }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    colSpan={9}
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={count}
              onChange={handleChangePage}
              shape="rounded"
              hideNextButton={!hasNextPage}
            />
          </Stack>
          <Typography marginTop={"20px"}>
            {currOffset + 1} - {currOffset + 10} of {totalCount} results
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const TableRowComponent = ({ row }) => {
  const [newRow, setNewRow] = useState(row);
  const [isAddNoteOpen, setAddNoteOpen] = useState(false);
  const minutes = Math.floor(row.duration / 60);
  const seconds = row.duration - minutes * 60;
  const handleAddNote = () => {
    setAddNoteOpen(true);
  };
  const handleToggleArchive = async (id) => {
    try {
      const resp = await toggleArchive(id);
      setNewRow(resp || row);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <TableRow>
      <TableCell sx={styles.tableBodyCell}>
        <Typography
          sx={{
            fontSize: "inherit",
            color:
              newRow.call_type === "voicemail"
                ? "#4F46F8"
                : newRow.call_type === "missed"
                ? "#C91D3E"
                : "#23CAB8",
          }}
        >
          {newRow.call_type === "voicemail"
            ? "Voice Mail"
            : newRow.call_type === "missed"
            ? "Missed"
            : "Answered"}
        </Typography>
      </TableCell>
      <TableCell sx={styles.tableBodyCell}>
        {" "}
        <Typography
          sx={{
            fontSize: "inherit",
            color: "#4F46F8",
            textTransform: "capitalize",
          }}
        >
          {newRow.direction}
        </Typography>
      </TableCell>
      <TableCell sx={styles.tableBodyCell}>
        <Typography fontSize={"inherit"}>
          {minutes} minutes {seconds} seconds
        </Typography>
        <Typography fontSize={"inherit"} color="#4F46F8">
          ({newRow.duration} seconds){" "}
        </Typography>
      </TableCell>
      <TableCell sx={styles.tableBodyCell}>{newRow.from}</TableCell>
      <TableCell sx={styles.tableBodyCell}>{newRow.to}</TableCell>
      <TableCell sx={styles.tableBodyCell}>{newRow.via}</TableCell>
      <TableCell sx={styles.tableBodyCell}>
        {newRow.created_at.substring(0, 10)}
      </TableCell>
      <TableCell sx={styles.tableBodyCell}>
        <Tag
          key={newRow.id}
          is_archived={newRow.is_archived}
          handleToggleArchive={handleToggleArchive}
          id={newRow.id}
        />
      </TableCell>

      <TableCell sx={styles.tableBodyCell}>
        <Box
          sx={{
            color: "white",
            backgroundColor: "#5E56FF",
            border: "none",
            padding: "5px",
            fontSize: "12px",

            width: "80px",
            borderRadius: "2px",

            textAlign: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleAddNote}
        >
          Add Note
        </Box>
        <AddNoteDialog
          open={isAddNoteOpen}
          setOpen={setAddNoteOpen}
          callID={newRow.id}
        />
      </TableCell>
    </TableRow>
  );
};

const Tag = ({ id, is_archived, handleToggleArchive }) => {
  return (
    <Box
      sx={{
        backgroundColor: is_archived ? "#EDFBFA" : "#EEEEEE",
        color: is_archived ? "#20C9B8" : "#7C7C7C",

        textAlign: "center",
        width: "90px",
        padding: "5px 2px",
        borderRadius: "2px",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => handleToggleArchive(id)}
    >
      {" "}
      {is_archived ? "Archived" : "Unarchived"}
    </Box>
  );
};
