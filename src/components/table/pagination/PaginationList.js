import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
export default function PaginationList({ pageNumber, setPage, totalCount }) {
  const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        "&.Mui-selected": {
          background: "#4f46f8",
          color: "white",
        },
      },
    },
    paginationStyle: {
      display: "flex",
      justifyContent: "center",
      marginTop: "40px",
      marginBottom: "10px",
    },

    totalCountStyle: {
      display: "flex",
      justifyContent: "center",
    },
  }));
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1);
  const onChangeHandler = (event, page) => {
    setCurrentPage(page);
    setPage(page);
  };
  return (
    <>
      <Pagination
        onChange={onChangeHandler}
        setPageNumber={setPage}
        className={classes.paginationStyle}
        count={pageNumber}
        shape="rounded"
        classes={{
          root: classes.ul,
        }}
      />
      <Typography
        className={classes.totalCountStyle}
        style={{ fontSize: "14px" }}
      >
        {" "}
        {currentPage} - {pageNumber} of {totalCount} results
      </Typography>
    </>
  );
}
