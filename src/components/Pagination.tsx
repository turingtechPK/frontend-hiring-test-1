import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface PaginationProps {
  currentPage: number;
  totalElements: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalElements,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalElements / itemsPerPage);
  const startRange = (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, totalElements);

  const renderPageNumbers = () => {
    const pages = [];
    const maxPageButtons = 10;
    const maxVisiblePages = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));

    if (totalPages - startPage + 1 < maxVisiblePages) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    for (let i = startPage; i < startPage + maxVisiblePages; i++) {
      if (i > totalPages) {
        break;
      }

      pages.push(
        <span
          key={i}
          style={{
            cursor: 'pointer',
            padding: '0.5rem',
            fontWeight: i === currentPage ? 'bold' : 'normal',
            backgroundColor: i === currentPage ? '#4F46F8' : 'transparent',
            color: i === currentPage ? 'white' : 'black',
            borderRadius: '5px',
            marginRight: '5px',
          }}
          onClick={() => onPageChange(i)}
        >
          {i}
        </span>
      );
    }

    return pages;
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Box>
        <Typography variant="h6">
          <span style={{ cursor: 'pointer' }} onClick={handlePrevClick}>
            &lt;
          </span>
          {renderPageNumbers()}
          <span style={{ cursor: 'pointer' }} onClick={handleNextClick}>
            &gt;
          </span>
        </Typography>
      </Box>
      <Typography variant="body2" marginTop={2}>
        {`${startRange}-${endRange} of ${totalElements}`}
      </Typography>
    </Box>
  );
};

export default Pagination;
