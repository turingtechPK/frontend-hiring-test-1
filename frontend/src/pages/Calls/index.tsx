import { useState } from "react";
import TopBar from "../../components/TopBar";
import {
  Chip,
  Container,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  colors,
} from "@mui/material";
import { useFetchCalls } from "../../hooks/useFetchCalls";
import { useSelector } from "react-redux";
import { ICall } from "../../common/types";
import { Button } from "@mui/material";
import Call from "../Call";
import moment from "moment";
import {
  capitalize,
  getTableTextColor,
  secondsToTimeStr,
} from "../../common/func";

const Calls = () => {
  const [offset, setOffset] = useState(0);

  useFetchCalls(offset);
  const calls = useSelector((state: any) => state.calls.calls);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.floor(calls?.totalCount / 10);

  const [openCallDialog, setOpenCallDialog] = useState(false);
  const [selectedCall, setSelectedCall] = useState("");

  const selectCall = (id: string) => {
    setSelectedCall(id);
    setOpenCallDialog(true);
  };

  const paginate = (e: any, p: number) => {
    setCurrentPage(p);
    setOffset(p * 10);
  };

  return (
    <>
      <TopBar />
      <Container maxWidth="xl" sx={{ marginTop: 5 }}>
        <Typography variant="h4">Turing Technologies Frontend Test</Typography>
        <TableContainer component={Paper} sx={{ marginTop: 5 }}>
          <Table
            sx={{ border: 0.2, borderColor: colors.grey[500] }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: colors.purple[50],
                  fontWeight: "bold",
                }}
              >
                <TableCell>CALL TYPE</TableCell>
                <TableCell>DIRECTION</TableCell>
                <TableCell>DURATION</TableCell>
                <TableCell>FROM</TableCell>
                <TableCell>TO</TableCell>
                <TableCell>VIA</TableCell>
                <TableCell>CREATED AT</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calls &&
                calls.nodes?.map((row: ICall) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Typography
                        sx={{ minWidth: "80px" }}
                        color={getTableTextColor(row.call_type)}
                      >
                        {row.call_type === "voicemail"
                          ? "Voice Mail"
                          : capitalize(row.call_type)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary">
                        {capitalize(row.direction)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {secondsToTimeStr(row.duration)}
                      <Typography sx={{ minWidth: "100px" }} color="primary">
                        ({row.duration} seconds)
                      </Typography>
                    </TableCell>
                    <TableCell>{row.from}</TableCell>
                    <TableCell>{row.to}</TableCell>
                    <TableCell>{row.via}</TableCell>
                    <TableCell>
                      <Typography sx={{ minWidth: "100px" }}>
                        {moment.utc(row.created_at).format("DD-MM-yyyy")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        sx={{
                          borderRadius: 1,
                          minWidth: "90px",
                          backgroundColor: row.is_archived
                            ? colors.grey[300]
                            : colors.green[100],
                          color: row.is_archived
                            ? colors.grey[500]
                            : colors.green[500],
                        }}
                        label={row.is_archived ? "Archived" : "Unarchive"}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => selectCall(row.id)}
                        sx={{ minWidth: "100px" }}
                      >
                        Add Note
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {calls && (
          <Grid
            container
            justifyContent="center"
            marginTop={4}
            marginBottom={4}
          >
            <Pagination
              color="primary"
              count={totalPages}
              page={currentPage}
              onChange={paginate}
            />
            <Grid item xs={12} marginTop={1}>
              <Typography textAlign="center">
                {offset + 1} -{" "}
                {currentPage === totalPages ? calls?.totalCount : offset + 10}{" "}
                of {calls?.totalCount} results
              </Typography>
            </Grid>
          </Grid>
        )}
      </Container>

      <Call
        id={selectedCall}
        open={openCallDialog}
        onClose={() => setOpenCallDialog(false)}
      />
    </>
  );
};

export default Calls;
