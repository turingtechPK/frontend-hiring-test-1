import { TableCell, TableRow } from "@mui/material";
import React from "react";

const TableColumnNames = () => {
  return (
    <>
      <TableRow>
        <TableCell sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Call Type
        </TableCell>
        <TableCell sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Direction
        </TableCell>
        <TableCell sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Duration
        </TableCell>
        <TableCell sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          From
        </TableCell>
        <TableCell sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          To
        </TableCell>
        <TableCell sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Via
        </TableCell>
        <TableCell sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Created At
        </TableCell>
        <TableCell sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Status
        </TableCell>
        <TableCell sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Actions
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableColumnNames;
