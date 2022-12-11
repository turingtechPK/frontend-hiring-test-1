import { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { TableCell, TableRow, Button } from "@mui/material";

import { TypographyCapitalizeStyles } from "../../styles/commonStyles";

const TableListRow = ({
  row: {
    id,
    direction,
    from,
    to,
    duration,
    is_archived: isArchived,
    call_type: callType,
    via,
    created_at: createdAt,
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TableRow key={`main-${id}`}>
        <TableCell align="center" width={300}>
          {callType}
        </TableCell>
        <TableCell align="center" width={300}>
          {direction}
        </TableCell>
        <TableCell align="center" width={300}>
          {duration}
        </TableCell>
        <TableCell align="center" width={300}>
          {from}
        </TableCell>
        <TableCell align="center" width={300}>
          {to}
        </TableCell>
        <TableCell align="center" width={300}>
          {via}
        </TableCell>
        <TableCell align="center" width={300}>
          {/* {format(new Date(created_at), DATE_FORMAT)} */}
          {createdAt}
        </TableCell>
        <TableCell align="center" width={300}>
          <TypographyCapitalizeStyles>
            {isArchived.toString()}
          </TypographyCapitalizeStyles>
        </TableCell>
        <TableCell align="center" width={300}>
          <Button variant="filled">Add Notes</Button>
        </TableCell>
      </TableRow>
    </>
  );
};

TableListRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    is_archived: PropTypes.bool.isRequired,
    call_type: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    via: PropTypes.string.isRequired,
  }).isRequired,
};

export default TableListRow;
