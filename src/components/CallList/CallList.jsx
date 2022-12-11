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
  DialogContent,
} from "@mui/material";
import TableHeaders from "./TableHeaders";
import TableBodyContainer from "./TableBodyContainer";
import {
  CALL_LIST_TABLE_HEADERS,
  REQ_STATUSES,
} from "../../constants/appUtilsConstants";
import TableListRow from "./TableListRow";
import TablePaginationControls from "./TablePaginationControls";
import { useDispatch, useSelector } from "react-redux";
import {
  callsListSelector,
  filterSelector,
  updatePageNumber,
  updatePageSize,
} from "../../store/slices/callListSlice";

import CloseIcon from "@mui/icons-material/Close";
import {
  DialogStyles,
  DialogTitleStyles,
  IconButtonStyles,
  FilterStyles,
} from "../../styles/CallListStyles";

const CallList = () => {
  const dispatch = useDispatch();
  const callsList = useSelector(callsListSelector);
  const { pageSettings, filterSettings } = useSelector(filterSelector);
  const [status, setStatus] = useState("all");
  const { page, perPage } = pageSettings;

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
            toggleCallDetail={toggleCallDetail}
            isLoading={REQ_STATUSES.loading === callsList.status}
            data={callsList.nodes}
            id="id"
            rows={10}
            colSpan={9}
          />
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                colSpan={9}
                count={
                  callsList.status === REQ_STATUSES.succeeded
                    ? callsList.totalCount
                    : 0
                }
                rowsPerPage={perPage}
                page={
                  callsList.status === REQ_STATUSES.succeeded ? page - 1 : 0
                }
                onPageChange={(event, newPage) =>
                  dispatch(updatePageNumber(newPage))
                }
                onRowsPerPageChange={(event) => {
                  callsList.status === REQ_STATUSES.succeeded &&
                    dispatch(updatePageSize(parseInt(event.target.value, 10)));
                }}
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
