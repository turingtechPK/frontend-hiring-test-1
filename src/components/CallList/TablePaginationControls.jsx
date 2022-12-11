import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

import { TablePaginationStyles } from "../../styles/commonStyles";

const TablePaginationControls = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}) => {
  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 1);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 2);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage)));
  };

  return (
    <TablePaginationStyles>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1 || page === -1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1 || page === -1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </TablePaginationStyles>
  );
};

TablePaginationControls.defaultProps = {
  count: 0,
  page: 0,
  rowsPerPage: 5,
};

TablePaginationControls.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default TablePaginationControls;
