import React from "react";
import Pagination from "@mui/material/Pagination";
import { Typography, PaginationItem } from "@mui/material";

import { stylesMui } from "./styles";
import "./styles.module.css";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    onPageChange(page);
  };

  return (
    <>
      <Pagination
        variant="outlined"
        shape="rounded"
        count={totalPages}
        defaultPage={currentPage}
        boundaryCount={10}
        renderItem={(item) => (
          <PaginationItem {...item} sx={stylesMui.paginationItem} />
        )}
        onChange={handlePageChange}
      />
      <Typography sx={stylesMui.paginationText}>
        {currentPage}-{currentPage + 10} of {totalPages} results
      </Typography>
    </>
  );
};

export default PaginationComponent;
