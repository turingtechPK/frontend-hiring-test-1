import PropTypes from "prop-types";
import { TableHead, TableCell, TableRow } from "@mui/material";
import { TypographyCapitalizeStyles } from "../../styles/commonStyles";

const TableHeaders = ({ headers }) => {
  return (
    <TableHead>
      <TableRow>
        {Object.entries(headers).map(([, { id, label }]) => (
          <TableCell align="center" key={id}>
            <TypographyCapitalizeStyles fontWeight={600}>
              {label}
            </TypographyCapitalizeStyles>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeaders.propTypes = {
  headers: PropTypes.object.isRequired,
};

export default TableHeaders;
