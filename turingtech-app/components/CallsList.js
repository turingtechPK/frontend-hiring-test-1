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
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getCalls } from "@/api/routes";
import CallRow from './CallRow'
import LoadingScreen from "./LoadingScreen";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  tableHeadCell: {
    fontSize: "12px",
    fontWeight: "700",
    border: "none",
    backgroundColor: "#f1f1f1",
    padding: "10px 16px",
  },
  statusButton: {
    color: "#514EF4",
    backgroundColor: "#ffffff",
    border: "none",
    padding: "3px 12px",
    borderRadius: "2px",
    textTransform: "none",
    fontSize: "0.8rem",
    fontWeight: "300",
  },
}));

function CallsList() {
  const classes = useStyles();
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
            fontWeight: "300",
            marginRight: "10px",
          }}
        >
          Filter By:{" "}
        </Typography>
        <Box>
          <Button
            id="status-button"
            className={classes.statusButton}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
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
            borderRadius: "6px",
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
                <TableCell className={classes.tableHeadCell}>CALL TYPE</TableCell>
                <TableCell className={classes.tableHeadCell}>DIRECTION</TableCell>
                <TableCell className={classes.tableHeadCell}>DURATION</TableCell>
                <TableCell className={classes.tableHeadCell}>FROM</TableCell>
                <TableCell className={classes.tableHeadCell}>TO</TableCell>
                <TableCell className={classes.tableHeadCell}>VIA</TableCell>
                <TableCell className={classes.tableHeadCell}>CREATED AT</TableCell>
                <TableCell className={classes.tableHeadCell}>STATUS</TableCell>
                <TableCell className={classes.tableHeadCell}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                filteredRows?.map((row, index) => {
                  return <CallRow key={row?.id} row={row} />;
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
                    <LoadingScreen />
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
          <Typography marginTop={"20px"} marginBottom={"20px"}>
            {currOffset + 1} - {currOffset + 10} of {totalCount} results
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};



export default CallsList;