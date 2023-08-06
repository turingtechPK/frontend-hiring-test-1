import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Pagination,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  tableCellClasses,
  TableBody,
  Table,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { tableHeaderColor } from "../../Utils/colorConstants";
import { tableStyles } from "./tableStyles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: tableHeaderColor,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //Table row cells border
  // // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}));

export default function DataTable({
  rows,
  linkString, rowsPerPage, totalCount, currentPage, onPageChange
}) {
  const headerKeys = Object.keys(rows[0] || {});
  const navigateTo = useNavigate();

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const totalpages = totalCount && !isNaN(totalCount) ? Math.ceil(totalCount / rowsPerPage) : 1;

  const startResult = startIndex + 1;
  const endResult = Math.min(endIndex, totalCount);

  const handleChangePage = (event, newPage) => {
    onPageChange(event, newPage);
  };
  //filter& appendHeaderKeys
  const filteredHeaderKeys = headerKeys.filter((key) => key !== "id");
  const updatedHeaderKeys = [...filteredHeaderKeys, "Actions"];

  const handleAddNoteClick = (id) => {
    navigateTo(`${linkString + "/" + id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={tableStyles.minWidth} aria-label="customized table">
        <TableHead>
          <TableRow>
            {updatedHeaderKeys.map((key, index) => (
              <StyledTableCell align="left" key={`${key}-${index}`}>
                {key}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(startIndex, endIndex).map((row, rowIndex) => {
            const { id, ...rowData } = row;
            const cells = updatedHeaderKeys.map((key, columnIndex) => (
              <StyledTableCell
                align="left"
                key={`${key}-${rowIndex}-${columnIndex}`}
              >
                {rowData[key]}
              </StyledTableCell>
            ));

            const lastColumnValue = (
              <StyledTableCell align="left" key={`action-${rowIndex}`}>
                <Button
                  variant="contained"
                  sx={tableStyles.actionBtn}
                  onClick={() => handleAddNoteClick(id)}
                >
                  Add Note
                </Button>
              </StyledTableCell>
            );

            cells[cells.length - 1] = lastColumnValue;
            return <StyledTableRow key={rowIndex}>{cells}</StyledTableRow>;
          })}
        </TableBody>
      </Table>
      <Box sx={tableStyles.pagination}>
        <Pagination
           page={currentPage}
           count={totalpages}
           onChange={handleChangePage}
        />
      </Box>
      <Box sx={tableStyles.resultBox}>
      <Typography variant="body2" sx={tableStyles.resultText}>
          {`${startResult}-${endResult} of ${totalCount} results`}
        </Typography>
      </Box>
    </TableContainer>
  );
}
