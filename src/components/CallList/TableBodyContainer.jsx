import PropTypes from "prop-types";
import { TableCell, TableRow, Skeleton, TableBody } from "@mui/material";

import { TypographyCapitalizeStyles } from "../../styles/commonStyles";

const TableSkeleton = (Component) => {
  const EnhancedComponent = ({ rows, colSpan, isLoading, ...props }) =>
    isLoading ? (
      <TableRow>
        <TableCell colSpan={colSpan}>
          {[...Array(rows)].map((_, index) => (
            <Skeleton
              key={`skeleton-${index}`}
              width="100%"
              height={30}
              variant="rectangular"
              sx={{ my: 2 }}
              animation="wave"
            />
          ))}
        </TableCell>
      </TableRow>
    ) : (
      <Component {...props} />
    );

  EnhancedComponent.propTypes = {
    rows: PropTypes.number.isRequired,
    colSpan: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  return EnhancedComponent;
};

const TableContent = ({ CustomTableRow, data, id }) =>
  data?.length > 0 ? (
    <TableBody>
      {data.map((row) => (
        <CustomTableRow row={row} key={row[id]} />
      ))}
    </TableBody>
  ) : (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={8}>
          <TypographyCapitalizeStyles>
            no records found
          </TypographyCapitalizeStyles>
        </TableCell>
      </TableRow>
    </TableBody>
  );

TableContent.propTypes = {
  CustomTableRow: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

const TableBodyContainer = TableSkeleton(TableContent);

TableBodyContainer.propTypes = {
  CustomTableRow: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired,
  colSpan: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default TableBodyContainer;
