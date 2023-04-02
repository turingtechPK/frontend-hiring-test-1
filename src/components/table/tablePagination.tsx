import React, { useState } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import { RECORDS_PER_PAGE } from "../../utils/constants";
interface AddNoteModalProps {
  totalCount: number;
  hasNextPage: boolean;
  fetchMoreData: (page: number) => void;
}

const TablePagination: React.FC<AddNoteModalProps> = ({
  totalCount,
  hasNextPage,
  fetchMoreData,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
      fetchMoreData(newPage);
      setCurrentPage(newPage);
  };
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Pagination
          shape="rounded"
          count={Math.floor(totalCount / RECORDS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "0.5rem" }}
      >
        <Typography variant="body1">
          {`${(currentPage-1) * RECORDS_PER_PAGE + 1}-${
            (currentPage) * RECORDS_PER_PAGE
          } out of ${totalCount} results`}
        </Typography>
      </Box>
    </>
  );
};

export default TablePagination;
