import { Box, IconButton, Typography } from "@mui/material";
import { FlexCenter, FlexRow } from "../../Flex/Flex";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import PropTypes from 'prop-types';


const calculatePageNumbers = (pageNo, totalPages, range = 2) => {
  const pageNumbers = [];
  for (let i = Math.max(0, pageNo - range); i <= Math.min(totalPages - 1, pageNo + range); i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};


const Pagination = ({ pageNo, setPageNo, totalPages }) => {
  const pageNumbers = calculatePageNumbers(pageNo, totalPages);
  const handlePrevClick = () => {
    if (pageNo - 1 >= 0) {
      setPageNo((prevPageNo) => prevPageNo - 1);
    }
  };

  const handleNextClick = () => {
    if (pageNo + 1 < totalPages) {
      setPageNo((prevPageNo) => prevPageNo + 1);
    }
  };

  return (
    <FlexCenter flexDirection="column">
      <FlexRow justifyItems="center" alignItems="center">
        <IconButton onClick={handlePrevClick}>
          <ArrowBackIosNewOutlined fontSize="small" />
        </IconButton>
        
         {pageNumbers.map((pageNumber) => (
          <Box
             key={pageNumber}
             color={`${pageNumber === pageNo ? "#fff" : "inherit"}`}
             bgcolor={`${pageNumber === pageNo ? "#1565C0" : "transparent"}`}
             borderRadius={0.5}
             paddingX={1}
             paddingY={0.5}
             marginX={0.5}
             sx={{ cursor: "pointer" }}
            onClick={() => setPageNo(pageNumber)}
          >
            {pageNumber + 1}
          </Box>
         ))}
        
        <IconButton onClick={handleNextClick}>
          <ArrowForwardIosOutlined fontSize="small" />
        </IconButton>
      </FlexRow>
      <Typography color="inherit" fontSize={"small"}>
           {pageNo + 1 } - 10  of {totalPages} results
        </Typography>
    </FlexCenter>
  )
}

Pagination.propTypes = {
  pageNo: PropTypes.number.isRequired,
  setPageNo: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};


export default Pagination