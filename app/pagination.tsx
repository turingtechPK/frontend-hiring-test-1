"use client";
import { Box, Button } from "@mui/material";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PageProps {
  totalPageCount: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PageProps> = ({
  totalPageCount,
  setCurrentPage,
  currentPage,
}) => {
  const pages = Array.from({ length: totalPageCount }, (_, i) => i + 1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box
      style={{ display: "flex", alignItems: "center" }}
      width="360px"
      marginTop="60px"
      marginX="auto"
    >
      <Button
        onClick={handlePrevPage}
        style={{ marginRight: "3px" }}
        disabled={currentPage === 1}
      >
        <IoChevronBack />
      </Button>
      {pages.map((page, index) => (
        <Box
          key={index}
          onClick={() => setCurrentPage(page)}
          style={{
            fontSize: "11px",
            backgroundColor: page === currentPage ? "blue" : "white",
            color: page === currentPage ? "white" : "black",
            width: "25px",
            height: "20px",
            paddingTop: "3px",
            paddingLeft: page === 10 ? "0.3px" : "3px",
            marginLeft: "4px",
            marginRight: "4px",
            borderRadius: "4px",
          }}
        >
          {page}
        </Box>
      ))}
      <Button
        onClick={handleNextPage}
        style={{ marginLeft: "3px" }}
        disabled={currentPage === totalPageCount}
      >
        <IoChevronForward />
      </Button>
    </Box>
  );
};

export default Pagination;
