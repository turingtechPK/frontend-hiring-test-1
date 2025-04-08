import React from "react";
import { Button } from "@mui/material";
import styles from "./pagination.module.scss";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className={`${styles.paginationControls} ${className}`}>
      <Button variant="outlined" onClick={handlePrevPage} disabled={currentPage === 1}>
        Prev
      </Button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNum = index + 1;
        return (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? "contained" : "outlined"}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Button>
        );
      })}

      <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
