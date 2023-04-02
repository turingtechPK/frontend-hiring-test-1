import React, { useState } from "react";
import { Box, Typography, Pagination } from "@mui/material";

const TablePagination = () => {
  const [totalResults, setTotalResults] = React.useState(25);
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(0);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage - 1);
  };
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Pagination
          shape="rounded"
          count={10} // Set the count of pages to 10
          page={currentPage + 1}
          onChange={handlePageChange}
          sx={{
            "& .Mui-selected": {
              backgroundColor: "blue",
              color: "white",
            },
          }}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "0.5rem" }}
      >
        <Typography variant="body1">
          {`${currentPage * rowsPerPage + 1}-${
            (currentPage + 1) * rowsPerPage
          } out of ${totalResults} results`}
        </Typography>
      </Box>
    </>
  );
};

export default TablePagination;
