import React from "react";
import Pagination from "@mui/material/Pagination";
import { Typography, PaginationItem } from "@mui/material";

import { stylesMui } from "./styles";
import "./styles.module.css";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
}) => {
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
      />
      <Typography sx={stylesMui.paginationText}>
        {currentPage}-x of {totalPages} results
      </Typography>
    </>
  );
};

export default PaginationComponent;
