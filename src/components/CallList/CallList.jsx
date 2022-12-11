import { useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableContainer,
  Typography,
  TableFooter,
  TableRow,
  TablePagination,
} from "@mui/material";
import TableHeaders from "./TableHeaders";
import TableBodyContainer from "./TableBodyContainer";
import { CALL_LIST_TABLE_HEADERS } from "../../constants/appUtilsConstants";
import TableListRow from "./TableListRow";
import TablePaginationControls from "./TablePaginationControls";

const data = [
  {
    id: 1,
    direction: "qwe",
    from: "asdf",
    to: "asdf",
    duration: 12,
    is_archived: true,
    call_type: "callType",
    via: "via",
    created_at: "created_at",
  },
];

const CallList = () => {
  const [status, setStatus] = useState("all");

  const handleChange = ({ target }) => {
    const { value } = target;
    setStatus(value);
  };

  return (
    <>
      <Box>
        <Typography variant="button">Filter by : </Typography>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <Select
            name="status"
            value={status}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="all">
              <em>All</em>
            </MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
            <MenuItem value="unarchived">Unarchived</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHeaders headers={CALL_LIST_TABLE_HEADERS} />
          <TableBodyContainer
            CustomTableRow={TableListRow}
            isLoading={false}
            data={data}
            id="id"
            rows={10}
            colSpan={6}
          />
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                colSpan={6}
                // count={status === REQ_STATUSES.succeeded ? activitiesCount : 0}
                // rowsPerPage={perPage}
                // page={status === REQ_STATUSES.succeeded ? page - 1 : 0}
                // onPageChange={(event, newPage) =>
                //   dispatch(updatePageNumber(newPage))
                // }
                // onRowsPerPageChange={(event) => {
                //   dispatch(clearActivityHistory());
                //   // eslint-disable-next-line no-unused-expressions
                //   status === REQ_STATUSES.succeeded &&
                //     dispatch(updatePageSize(parseInt(event.target.value, 10)));
                // }}
                ActionsComponent={TablePaginationControls}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default CallList;
