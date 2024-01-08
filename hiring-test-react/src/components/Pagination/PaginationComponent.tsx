import React from "react";
import Pagination from "@mui/material/Pagination";
import { Typography, PaginationItem } from "@mui/material";

import { stylesMui } from "../../styles";
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
          <PaginationItem
            {...item}
            sx={{
              border: "#fff",
              mx: "0.5rem",
              "&:hover": {
                background: "var(--grey-50, #4f46f8)",
                color: "#fff",
              },
              "&.Mui-selected": {
                background: "var(--grey-50, #4f46f8)",
                color: "#fff",
              },
            }}
          />
        )}
      />
      <Typography sx={{ ...stylesMui.pageBody, fontSize: "15px" }}>
        {currentPage}-x of {totalPages} results
      </Typography>
    </>
  );
};

export default PaginationComponent;
